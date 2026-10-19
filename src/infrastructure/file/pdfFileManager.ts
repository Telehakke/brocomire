import * as pdf from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { HashCalculator } from "./hashCalculator";

pdf.GlobalWorkerOptions.workerSrc = workerSrc;

export class PDFFileManager implements FileManager {
  private pdfDocument: pdf.PDFDocumentProxy | undefined;
  private hashedFileName: string | undefined;

  private constructor(pdfDocument: pdf.PDFDocumentProxy, hashedFileName?: string) {
    this.pdfDocument = pdfDocument;
    this.hashedFileName = hashedFileName;
  }

  static async create(file: File, hashCalculator: HashCalculator): Promise<PDFFileManager> {
    const data = new Uint8Array(await file.arrayBuffer());
    const pdfDocument = await pdf.getDocument({
      data,
      cMapUrl: `${import.meta.env.BASE_URL}cmaps/`,
      cMapPacked: true,
    }).promise;
    return new PDFFileManager(pdfDocument, await hashCalculator.execute(file.name));
  }

  clear(): void {
    this.pdfDocument = undefined;
    this.hashedFileName = undefined;
  }

  getLength(): number {
    return this.pdfDocument?.numPages ?? 0;
  }

  hasFiles(): boolean {
    return (this.pdfDocument?.numPages ?? 0) > 0;
  }

  async getBlob(index: number, cache?: Cache): Promise<Blob | undefined> {
    if (index < 0 || index >= this.getLength()) return undefined;
    const blob = await this._getBlob(index, cache);
    this.addCache(index, blob, cache);
    return blob;
  }

  private async _getBlob(index: number, cache?: Cache): Promise<Blob | undefined> {
    const blob = cache?.get(index);
    if (blob != null) return blob;

    const page = await this.pdfDocument?.getPage(index + 1);
    if (page == null) return undefined;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx == null) return undefined;

    const viewport = page.getViewport({ scale: 1 });
    const scale = this.getScale(viewport.width, viewport.height);
    canvas.width = Math.floor(viewport.width * scale);
    canvas.height = Math.floor(viewport.height * scale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `{${Math.floor(viewport.height)}px`;
    const transform: number[] = [scale, 0, 0, scale, 0, 0];
    await page.render({ canvasContext: ctx, canvas, viewport, transform }).promise;
    page.cleanup();
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob ?? undefined), "image/png");
    });
  }

  /** 長辺が2000pxに満たない場合、何倍すると2000pxになるかを返す */
  private getScale(width: number, height: number): number {
    if (width === 0 || height === 0) return 1;
    const ratio = width / height;
    const amount = 2000;
    return Math.max(ratio >= 1 ? amount / width : amount / height, 1);
  }

  private addCache(index: number, blob?: Blob, cache?: Cache): void {
    if (blob == null || cache == null) return;
    cache.add(index, blob);
  }

  getHashedFileName(): string | undefined {
    return this.hashedFileName;
  }
}
