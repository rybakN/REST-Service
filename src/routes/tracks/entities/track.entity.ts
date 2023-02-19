import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { Exclude } from 'class-transformer';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;
  @Column()
  duration: number;

  @Exclude()
  @Column({ default: false })
  favorite: boolean;
}
