export class TrackEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null = null; // refers to Artist
  albumId: string | null = null; // refers to Album
  duration: number; // integer number
}
