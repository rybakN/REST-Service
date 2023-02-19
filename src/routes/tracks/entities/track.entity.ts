import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null; // refers to Artist
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null; // refers to Album
  @Column()
  duration: number; // integer number

  @Column({ default: true })
  favorite: boolean;
}
