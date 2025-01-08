interface ISMTValue {
    value: string;
    type: string | "color" | "dimension";
    parent: string | "Color/Value" | "Design System/light";
    description: string;
}

interface ISMTCategory {
    [key: string]: ISMTValue;
}

interface ISMTTokenValueSet {
    [key: string]: ISMTCategory;
}

interface ISMTMetadata {
    tokenSetOrder: string[];
}

interface ISMTToken {
    $metadata: ISMTMetadata;
    $themes: any[];
    'Color/Value': ISMTTokenValueSet;
    'Design System/light': ISMTTokenValueSet;
}