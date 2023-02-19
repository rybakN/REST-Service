import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => TrackEntity, (track) => track.albumId)
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
}
