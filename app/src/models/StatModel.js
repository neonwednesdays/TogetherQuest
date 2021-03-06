import schema from 'js-schema';

import * as catquestLanguageHelper from 'apis/catquest/catquestLanguageHelper';

import Model from 'models/Model'

export const statSchema = schema({
  // type
  typeId: String,
  // description
  '?description': String,
  // name of icon
  '?icon': String,
  // base value of modifier
  value: Number,
  // how much a given amount affects a dice roll
  influence: Function,
})

export const STAT_TYPE_ID = {
  STRENGTH: 'strength-stat-id',
  AGILITY: 'agility-stat-id',
  WISDOM: 'wisdom-stat-id',
  CHARISMA: 'charisma-stat-id',
  MAGIC: 'magic-stat-id',
}

const STAT_TYPE_ICON = {
  [STAT_TYPE_ID.STRENGTH]: 'ra-muscle-up',
  [STAT_TYPE_ID.AGILITY]: 'fa-running',
  [STAT_TYPE_ID.WISDOM]: 'fa-brain',
  [STAT_TYPE_ID.CHARISMA]: 'fa-smile-wink',
  [STAT_TYPE_ID.MAGIC]: 'ra-fairy-wand',
}

export class StatModel extends Model {
  constructor(options = {}) {
    super(options);

    this.schema = statSchema;

    this.set(Object.assign({
      icon: STAT_TYPE_ICON[options.typeId],
      value: 0,
      influence: (value) => (value),
    }, options));

    this.validate();
  }
  /**
   * gets the name of this stat
   *
   * @returns {string}
   */
  getName() {
    return catquestLanguageHelper.getStatName(this.get('typeId'));
  }
}

export default StatModel;
