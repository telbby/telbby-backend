import { EntityRepository, Repository } from 'typeorm';

import ThemeEntity from '../entity/theme';

@EntityRepository(ThemeEntity)
class ThemeRepository extends Repository<ThemeEntity> {
  async findById(id: number): Promise<ThemeEntity | undefined> {
    const theme = await this.findOne({ where: { id } });
    return theme;
  }
}

export default ThemeRepository;
