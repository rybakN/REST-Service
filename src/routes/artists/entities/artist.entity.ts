import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { Exclude } from 'class-transformer';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => TrackEntity, (track) => track.artistId)
  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @Exclude()
  @Column({ default: false })
  favorite: boolean;
}
