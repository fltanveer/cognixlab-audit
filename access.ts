// Who may open which audit. Managed by `npm run new-audit` and `npm run access`.
// Holds only SHA-256 hashes of the access tokens, so this file is safe to commit.
// The token itself exists only in the link you send to the client.

export interface Grant {
  /** SHA-256 (hex) of the access token. */
  hash: string
  /** Optional last day of access, YYYY-MM-DD (UTC). */
  expires?: string
}

export const ACCESS: Record<string, Grant> = /*ACCESS-BEGIN*/{
  "hrpivotworks": {
    "hash": "f72f61a50caa3d3b7974a52f2e036887b8daa8df14d00119703da63c81c6d57f"
  },
  "noelte": {
    "hash": "26fa7ba61e347b1cda2b8f9246ccc28279840dfdf34bdd95e74504213f597924"
  }
}/*ACCESS-END*/
