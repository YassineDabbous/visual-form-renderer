
export interface FormDefinition {
  settings: FormSettings;
  options?: FormOptions;
  startSlide?: FormSlide;
  slides: FormSlide[];
  endSlide?: FormSlide;
}

export interface FormSlide {
  slideOptions?: SlideOptions;
  elements: FormElement[];
}

export interface ChoiceOption {
  value: string;
  label: string;
  image?: string;
}

export interface FormElement {
  type: string;
  name?: string;
  
  // Shared properties
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
  attrs?: Array<{ name: string; value: string }>;
  displayCondition?: {
    condition: string;
  };
  value?: any; // Default or initial value

  // Exam Mode properties
  answer?: any;
  score?: number;
  reason?: string;

  // Text-like input properties
  placeholder?: string;
  multiline?: boolean;
  maxlength?: number;
  pattern?: string;
  rows?: number; // for textarea

  // Number input properties
  min?: number | string;
  max?: number | string;
  step?: number | string;
  unit?: string;
  unitEnd?: string;

  // Select/Choice properties
  options?: object|Array<string | { label: string; value?: string }>; // For SelectBox
  choices?: Array<string | { label: string; value?: string, image?: string }>; // For Choice/PictureChoice
  multiple?: boolean;
  horizontal?: boolean;
  hideFormText?: boolean;
  checked?: string[];

  // PictureChoice specific
  supersize?: boolean;
  hideLabels?: boolean;

  // Rating input properties
  outOf?: number;
  icon?: 'star' | 'heart' | 'hearts';
  
  // OpinionScale specific
  startAt?: number;
  labelStart?: string;
  labelEnd?: string;
  hideLabelStart?: boolean;
  hideLabelEnd?: boolean;

  // File input specific
  sizeLimit?: number; // in MB
  imageOnly?: boolean;
  currentFile?: string;

  // Display element properties
  text?: string;
  src?: string;
  alt?: string;
  items?: string[]; // For ul/ol
  content?: string; // For code
  
  [key: string]: any;
}

export interface FormSettings {
  id: string;
  postUrl?: string;
  isAutoSolvable?: boolean;
  [key:string]: any;
}

export interface FormOptions {
  [key: string]: any;
}

export interface SlideOptions {
  jumpCondition?: string;
  pageProgress?: string;
  [key: string]: any;
}