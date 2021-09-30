interface QueryOptions {
  location: 'last' | 'first' | 'after' | 'replace';
}

interface IInjectHTML {
  query: string;
  tag: string;
  queryOptions?: QueryOptions;
  attributes?: Attributes;
  className?: string;
  reference?: string
}

interface Attribute {
  key: string
  value: any
}

type Attributes = Attribute[]

const injectLocation = (
    element: Element,
    _newElement: Element,
    location: string,
    reference?: Element,
) => {
  switch (location) {
    case 'first':
      element.insertBefore(_newElement, element.firstChild);
      return _newElement;
    case 'replace':
      if (reference) {
        element.replaceChild(_newElement, reference);
      } else {
        throw Error(`No reference element was passed,
          try adding a referenceQuery to options`);
      }
    case 'after':
      if (reference) {
        const referenceNode = reference.nextSibling;
        if (referenceNode) {
          element.insertBefore(_newElement, referenceNode);
          return _newElement;
        } else {
          // pass to last and default
        }
      } else {
        throw Error(`No reference element was passed,
            try adding a referenceQuery to options`);
      }
    case 'last':
    default:
      element.appendChild(_newElement);
      return _newElement;
  }
};

const injectTag = (
    {
      query,
      queryOptions= {
        location: 'last',
      },
      attributes = [],
      className = '',
      reference,
      tag,
    }: IInjectHTML) => {
  let refNode;
  if (reference) {
    refNode = document.querySelector(reference);
  }

  const element = document.querySelector(query);
  const _newElement = document.createElement(tag);

  _newElement.className = className;
  attributes.forEach(
      (attribute) => (
        _newElement.setAttribute(attribute.key, attribute.value)
      ));

  injectLocation(element, _newElement, queryOptions.location, refNode);
  return _newElement;
};

export {injectTag};
