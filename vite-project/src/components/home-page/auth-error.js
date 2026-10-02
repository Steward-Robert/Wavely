const technicalMessagePattern =
  /(?:\b(?:axios|prisma|sql|stack trace|internal server|exception|undefined|null|syntaxerror|typeerror|referenceerror)\b|https?:\/\/|status code\s*\d{3}|\b(?:ECONN[A-Z]*|ERR_[A-Z_]+)\b|<[^>]+>)/i;

export function getAuthErrorMessage(error, action) {
  const fallback =
    action === "register"
      ? "We couldn't create your account. Please try again."
      : "We couldn't log you in. Please try again.";

  if (!error?.response) {
    if (error?.request || error?.code === "ERR_NETWORK") {
      return "We couldn't connect to Wavely. Check your internet connection and try again.";
    }
    return fallback;
  }

  const { status, data } = error.response;
  const message = typeof data?.message === "string" ? data.message.trim() : "";
  const normalizedMessage = message.toLowerCase();

  if (
    action === "login" &&
    /invalid email or password|email or password is incorrect/.test(
      normalizedMessage,
    )
  ) {
    return "The email or password is incorrect. Check your details and try again.";
  }

  if (
    action === "register" &&
    /user already exists|email already (?:exists|registered)/.test(
      normalizedMessage,
    )
  ) {
    return "An account with this email already exists. Sign in or use a different email.";
  }

  if (status === 429) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (
    message &&
    message.length <= 180 &&
    !technicalMessagePattern.test(message)
  ) {
    return message;
  }

  if (status >= 500) {
    return "Wavely is temporarily unavailable. Please try again shortly.";
  }

  return fallback;
}
