// Contact submissions are stored with IDs in this path. Documents whose ID
// contains a "." are only readable by authenticated requests, which keeps
// visitor messages private even though the dataset itself is public.
export const SUBMISSION_ID_PREFIX = "contactSubmission.";
