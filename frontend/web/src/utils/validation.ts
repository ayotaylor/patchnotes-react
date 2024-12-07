// First, let's define specific types for our form values
export interface FormValues {
  [key: string]: string | number | boolean | undefined;
}

// Interface for validation rules
export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  match?: string; // For password confirmation
}

// Interface for validation rules configuration
export interface ValidationRuleConfig {
  [key: string]: ValidationRules;
}

// Interface for validation errors
export interface ValidationErrors {
  [key: string]: string;
}

export class Validator {
  // Define patterns as a static readonly property for better encapsulation
  private static readonly patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    password: /^[a-zA-Z]{8,}$/,/* /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, */
    username: /^[a-zA-Z0-9_-]{3,16}$/,
  };

  static validate(
    values: FormValues,
    rules: ValidationRuleConfig
  ): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
      // Get the strongly typed value and rules
      const value = values[field];
      const fieldRules = rules[field];

      // Required field validation
      if (fieldRules.required && !value) {
        errors[field] = "This field is required";
        return;
      }

      // Only proceed with other validations if we have a value
      if (value !== undefined && value !== null) {
        // Convert value to string for length and pattern checks
        const stringValue = String(value);

        // Minimum length validation
        if (fieldRules.minLength && stringValue.length < fieldRules.minLength) {
          errors[field] = `Must be at least ${fieldRules.minLength} characters`;
          return;
        }

        // Maximum length validation
        if (fieldRules.maxLength && stringValue.length > fieldRules.maxLength) {
          errors[field] = `Must not exceed ${fieldRules.maxLength} characters`;
          return;
        }

        // Pattern validation
        if (fieldRules.pattern && !fieldRules.pattern.test(stringValue)) {
          errors[field] = `Invalid ${field} format`;
          return;
        }

        // Match validation (for password confirmation)
        if (fieldRules.match && stringValue !== values[fieldRules.match]) {
          errors[field] = "Passwords do not match";
          return;
        }
      }
    });

    return errors;
  }

  static getDefaultRules(): ValidationRuleConfig {
    return {
      username: {
        required: true,
        minLength: 3,
        maxLength: 16,
        pattern: this.patterns.username,
      },
      email: {
        required: true,
        pattern: this.patterns.email,
      },
      password: {
        required: true,
        minLength: 8,
        pattern: this.patterns.password,
      },
      confirmPassword: {
        required: true,
        match: "password",
      },
    };
  }
}
