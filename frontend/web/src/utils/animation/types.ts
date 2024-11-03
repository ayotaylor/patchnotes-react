export interface AnimationConfig {
    duration?: number;
    delay?: number;
    easing?: string;
    useNativeDriver?: boolean;
  }

  export interface TransitionConfig extends AnimationConfig {
    property: string;
    from: number | string;
    to: number | string;
  }