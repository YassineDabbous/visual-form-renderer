import { default as default_2 } from 'react';
import { default as i18n } from 'i18next';

export declare const CustomFormRenderer: default_2.FC<CustomFormRendererProps>;

declare interface CustomFormRendererProps {
    formDefinition: FormDefinition;
    onSubmit: (answers: {
        [key: string]: any;
    }) => void;
    durationInMinutes?: number;
    startedAt?: Date;
    language?: 'en' | 'fr' | 'ar';
    showCorrection?: boolean;
}

declare interface FormDefinition {
    settings: FormSettings;
    options?: FormOptions;
    startSlide?: FormSlide;
    slides: FormSlide[];
    endSlide?: FormSlide;
}

declare interface FormElement {
    type: string;
    name?: string;
    question?: string;
    required?: boolean;
    description?: string;
    fieldSize?: 'sm';
    labelStyle?: 'classic';
    subfield?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    id?: string;
    classNames?: string[];
    attrs?: Array<{
        name: string;
        value: string;
    }>;
    displayCondition?: {
        condition: string;
    };
    value?: any;
    answer?: any;
    score?: number;
    reason?: string;
    placeholder?: string;
    multiline?: boolean;
    maxlength?: number;
    pattern?: string;
    rows?: number;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    unit?: string;
    unitEnd?: string;
    options?: object | Array<string | {
        label: string;
        value?: string;
    }>;
    choices?: Array<string | {
        label: string;
        value?: string;
        image?: string;
    }>;
    multiple?: boolean;
    horizontal?: boolean;
    hideFormText?: boolean;
    checked?: string[];
    supersize?: boolean;
    hideLabels?: boolean;
    outOf?: number;
    icon?: 'star' | 'heart' | 'hearts';
    startAt?: number;
    labelStart?: string;
    labelEnd?: string;
    hideLabelStart?: boolean;
    hideLabelEnd?: boolean;
    sizeLimit?: number;
    imageOnly?: boolean;
    currentFile?: string;
    text?: string;
    src?: string;
    alt?: string;
    items?: string[];
    content?: string;
    [key: string]: any;
}

declare interface FormOptions {
    [key: string]: any;
}

declare interface FormSettings {
    id: string;
    postUrl?: string;
    isAutoSolvable?: boolean;
    [key: string]: any;
}

declare interface FormSlide {
    slideOptions?: SlideOptions;
    elements: FormElement[];
}

export { i18n }

declare interface SlideOptions {
    jumpCondition?: string;
    pageProgress?: string;
    [key: string]: any;
}

export { }
