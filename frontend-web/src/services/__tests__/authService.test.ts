/**
 * Authentication Service Tests
 *
 * Tests for authentication service functions including login,
 * registration, and token handling.
 *
 * @author Team
 * @version 1.0
 */

import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  validatePasswordStrength,
  isEmailDomainAllowed,
} from '../authService';

describe('authService', () => {
  describe('isValidEmail', () => {
    it('should validate correct email format', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
    });

    it('should reject invalid email format', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should return weak password score for simple passwords', () => {
      const result = validatePasswordStrength('abc');
      expect(result.score).toBeLessThan(40);
    });

    it('should return strong password score for complex passwords', () => {
      const result = validatePasswordStrength('SecurePass123!@#');
      expect(result.score).toBeGreaterThanOrEqual(80);
    });

    it('should provide feedback for weak passwords', () => {
      const result = validatePasswordStrength('weak');
      expect(result.feedback.length).toBeGreaterThan(0);
    });
  });

  describe('isEmailDomainAllowed', () => {
    it('should return true for allowed domains', () => {
      const allowed = ['example.com', 'company.com'];
      expect(isEmailDomainAllowed('user@example.com', allowed)).toBe(true);
      expect(isEmailDomainAllowed('user@company.com', allowed)).toBe(true);
    });

    it('should return false for disallowed domains', () => {
      const allowed = ['example.com'];
      expect(isEmailDomainAllowed('user@other.com', allowed)).toBe(false);
    });

    it('should return false for invalid email format', () => {
      const allowed = ['example.com'];
      expect(isEmailDomainAllowed('invalid', allowed)).toBe(false);
    });
  });
});
