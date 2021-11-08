import type { Certificate, Artist } from "@prisma/client";

export type CertificateWithArtist = Certificate & { artist: Artist };
