import React, { PureComponent } from 'react';
import cn from 'classnames';

import {
  Icon,
} from 'components';

export class InventoryComponent extends PureComponent {
  static defaultProps = {
    /** @type {string} */
    baseClassName: 'mar-t-1 grid-cols-2',
    /** @type {string} */
    className: '',
    /** @type {Collection<ItemModel>} */
    inventory: [],
  }
  /** @override */
  render() {
    const {
      baseClassName,
      className,
      inventory,
    } = this.props;

    return (
      <div className={cn('inventory-component', baseClassName, className)}>
        { inventory.map((item) => (
          <InventoryItemComponent
            key={item.id}
            itemModel={item}
          />
        ))}
      </div>
    );
  }
}

export class InventoryItemComponent extends PureComponent {
  static defaultProps = {
    /** @type {string} */
    baseClassName: 'borradius-2 mar-1 flex-col position-relative bg-navy',
    /** @type {string} */
    className: '',
    /** @type {ItemModel} */
    itemModel: [],
  }
  /** @override */
  render() {
    const {
      baseClassName,
      className,
      itemModel,
    } = this.props;

    // const {

    // } = itemModel.attributes;

    return (
      <div
        className={cn('item-component', baseClassName, className)}
      >
        <div className='position-absolute pos-0 flex-centered opacity-2 mar-b-1'>
          {this.getBackgroundIcon()}
        </div>

        <div
          className='flex-centered flex-grow flex-wrap pad-1 color-white text-stroke text-center zindex-1'
        >
          {this.getDisplayText()}
        </div>
      </div>
    );
  }
  /**
   * @returns {string}
   */
  getDisplayText() {
    const { itemModel: { attributes }} = this.props;
    const {
      isStackable,
      name,
      quantity,
    } = attributes;

    if (isStackable) {
      return `${quantity} ${name}`;
    }

    return name;
  }
  /**
   * @returns {React.Element}
   */
  getBackgroundIcon() {
    const { itemModel: { attributes }} = this.props;
    const {
      icon,
    } = attributes;

    return (
      <Icon
        name={icon}
        className='fsize-8'
      />
    )
  }
}
