import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'theme' })
class ThemeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20, unique: true })
  name: string;
}

export default ThemeEntity;
