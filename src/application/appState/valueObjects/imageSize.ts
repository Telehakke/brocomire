import { ValueObject } from "../../../domain/models/utils/valueObject";

type ImageSizeValue = Readonly<{
    width: number;
    height: number;
}>;

declare const ImageSizeBrand: unique symbol;

export class ImageSize extends ValueObject<ImageSizeValue> {
    declare [ImageSizeBrand]: unknown;

    constructor(imageSize: ImageSizeValue) {
        super(imageSize);
    }

    equals(other: this): boolean {
        return (
            this.value.width === other.value.width &&
            this.value.height === other.value.height
        );
    }
}
