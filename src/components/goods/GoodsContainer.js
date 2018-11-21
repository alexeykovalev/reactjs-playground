import React, { Component } from 'react';
import './GoodsContainer.css';
import collection from 'lodash/collection';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.checkBoxRef = React.createRef();
  }

  onSearchCriteriaChanged = () => {
    const searchCriteria = { 
      searchTerm: this.searchInputRef.current.value, 
      showOnlyStockedItems: this.checkBoxRef.current.checked 
    };
    this.props.onSearchCriteriaChanged(searchCriteria);
  };

  render() {
    return (
      <div className="search-bar">
        <input type="text" ref={this.searchInputRef} placeholder="Search..." value={this.props.searchTerm} onChange={ this.onSearchCriteriaChanged } />
        <label>
          <input ref={this.checkBoxRef} type="checkbox" checked={this.props.showOnlyStockedGoods} onChange={ this.onSearchCriteriaChanged} />
          Show only stocked items 
        </label>    
      </div>
    );
  }
}

// Props: { name, items: [ { name, price }, ... ] }
const CategoryContainer = (props) => {
  const { name, items } = props;
  const itemNames = items.map(item => item.name);
  const itemPrices = items.map(item => item.price);
  return (
    <div className="category-container clear">
      <p className="category-name">{name}</p>
      
      <div className="item-names">
        { itemNames.map(name => <p key={name}>{name}</p>) }
      </div>

      <div className="item-prices">
        { itemPrices.map(price => <p key={price}>{price}</p>) }
      </div>
    </div>
  );
};

// [ item1, item2, ..., itemN ] => 
// [ { name, cagegoryItems: [] } ] => 
// [ <CategoryContainer name={name} items={items} />, ..., <CategoryContainerXXX /> ]

// goodItem == {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
class GoodsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { fullStore: props.goods, currentStore: props.goods };
  }

  onSearchCriteriaChanged = (seachQuery) => {
    if (seachQuery.searchTerm === '') {
      this.setState({ currentStore: this.state.fullStore });
      return;
    }
    const filteredGoods = this.state.fullStore.filter(item => item.name.toLowerCase().includes(seachQuery.searchTerm));
    this.setState({ currentStore: filteredGoods });
  } 

  render() {
    const goodsByCategory = collection.groupBy(this.state.currentStore, item => item.category);
    const categoryContainers = collection.map(goodsByCategory, goodsInCategory => {
      const categoryName = goodsInCategory[0].category;
      const categoryItems = goodsInCategory.map(item => ({ name: item.name, price: item.price }));
      return <CategoryContainer key={categoryName} name={categoryName} items={categoryItems} />
    });
    return (
      <div>
        <SearchBar onSearchCriteriaChanged={ this.onSearchCriteriaChanged }/>
        { categoryContainers }
      </div>
    );
  }
}

export default GoodsContainer;
