import arr from 'lodash/collection';

function groupBySelector(elements, selector) {
  return elements.reduce((accumulator, element) => {
    const key = selector(element);
    if (!accumulator.hasOwnProperty(key)) {
      accumulator[key] = [];
    }
    accumulator[key].push(element);
    return accumulator;
  }, {});
}

test('check group by', () => {
  const items = [
    {key: "one", value: 10},
    {key: "two", value: 7},
    {key: "one", value: 17},
  ];
  // const subject = groupBySelector(items, item => item.key);
  
  const subject = arr.groupBy(items, item => item.key);
  const expected = {
    "one": [{key: "one", value: 10}, {key: "one", value: 17}],
    "two": [{key: "two", value: 7}]
  };
  expect(subject).toMatchObject(expected);
});
