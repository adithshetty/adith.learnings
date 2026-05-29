import "server-only";
import { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import { readRequiredEnv } from "@/utils/env";

export class AuthError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

function parseBearerToken(authHeader: string | null): string | null {
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");

  if (!scheme || !token || scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}

export function getOwnerEmail(): string {
  return readRequiredEnv("OWNER_EMAIL").toLowerCase();
}

export function isOwnerEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  return email.toLowerCase() === getOwnerEmail();
}

export async function verifyFirebaseBearerToken(
  authHeader: string | null
): Promise<DecodedIdToken | null> {
  const bearerToken = parseBearerToken(authHeader);

  if (!bearerToken) {
    return null;
  }

  try {
    return await getFirebaseAdminAuth().verifyIdToken(bearerToken);
  } catch {
    return null;
  }
}

export async function requireOwnerFromAuthHeader(
  authHeader: string | null
): Promise<DecodedIdToken> {
  const decodedToken = await verifyFirebaseBearerToken(authHeader);

  if (!decodedToken) {
    throw new AuthError(401, "Authentication required");
  }

  if (!isOwnerEmail(decodedToken.email)) {
    throw new AuthError(403, "You are not allowed to perform this action");
  }

  return decodedToken;
}
