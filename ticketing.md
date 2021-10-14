# Creating a new ticket system.

This Documentation explains how to add a new ticket system to use zeit extension button or create new element and inject it to a webpage.

### 1 Structure

1. To integrate a new ticket system, you will need to create a folder in `src/extension-integrations/integrations`, the folder name will be the integration name across the app settings.

2. Create `index.tsx` and `app.tsx` inside the new ticket system folder.

3. Optional global components can go inside `src/extension-integrations/components`.

4. Optional components can go inside `src/extension-integrations/<INTEGRATION>/components`.

4. `routes` is used to specify integration url path using a regex (details in next steps).

* Structure:
```
src
├── extension-inject
│ 
├── extension-integrations
│   ├── components
│   │   └── ...
│   │
│   ├── integrations
│   │   ├── github
│   │   ├── gitlab
│   │   ├── jira
│   │   └── ... // Add integration here
│   └── routes
│       └── index.tsx
└── ...
```

### 2 Linking the integration to the extension app

* To link the integration to run on a specific page, you should specify the path in `manifest.json`:

```
// dist/manifest.json

    ...
    "content_scripts": [
        ...,
        {
            "matches": [
                ...
                "https://*.github.com/*/*/issues/*",
                // Add here
            ],
            ...
    ]

```

* Now the app will run when you visit the page but you need to specify the regex path to the according `integration` in `src/extension-integrations/routes/index.tsx`

```js
export const ROUTES = [
  {
    integration: 'github',
    rule: /^https:\/\/.*github.com\/.*\/.*\/issues\/.*$/,
  },
  ...,
  {
    integration: <INTEGRATION NAME>,
    rule: <INTEGRATION JAVASCRIPT REGEX>,
  },
]
```

### 3 `<Integration>/index.tsx`

Here goes the creatiion of the react fake dom and injecting it to the webpage.

* `injectTag`:

A function that will handle creating an HTML element with `tag` name, `class` and `attributes`.

```typescript
injectTag({ query, queryOptions, attributes, className, reference, tag, }: IInjectHTML): HTMLElement
```

* `query`:

This is the argument to select the targetted html element in the webpage, uses `document.querySelector`.

```typescript
query: string;
```

* `tag`:

This is the element html tag name `div`, `span`, `p`...

* `queryOptions` [optional]:

This is the query options, currently it only have `location` which can take one of the string values `'last' | 'first' | 'after' | 'replace'`.

Note: If it's not `after` or `replace` then the `reference` must be passed with the arguments.

```typescript
queryOptions?: {
  location: 'last' | 'first' | 'after' | 'replace';
};
```

* `attributes` [optional]:

This is the created element attributes, takes a `key` and a `value`.

```typescript
attributes?: {
  key: string
  value: any
};
```

* `className` [optional]:

This is the html class name or names to style the element, the css style files can be imported in the react components files.


* `reference` [optional]:

This is similar to query and it also uses `document.querySelector` which select an element that action should be applied to
If you used `location` of `replace` or `after`, you should pass the refernce.

### 4 App & React DOM

Once you specify the injected element in the webpage, you should pass it to the ReactDOM.render.

```tsx
ReactDOM.render(<App />, injectElement);
```

* `app.tsx` will contain the `App` component which will use the created HTML element (`injectElement`) as parent.

* `App` is a react component.

### Using existing components

Currently there is only zeit button `src/extension-integrations/components/ZeitButton.tsx`, which is a button that start, pause and resume the zeit timer and sends ticket title and ticket id to the background.

* `className` [optional]:

This is the button style class name, the styles are in `src/styles/zeit-button.css`

* `title`:

This is the ticket title.

* `ticketID`:

This is the ticket id.

## Cases

Some elements you want to inject to might be loaded later, after the document is loaded, like dynamic modals or fetched components, in this case the default manifest will try to run injecting script once the document is loaded, however this won't work in this case and it will just throw an error that it couldn't find the element to move in, to see one way around that please check (Jira integration)[https://github.com/zeit-io/browser-plugin/tree/main/src/extension-integrations/integrations/jira] where we use setInterval to check for the component in the specified path each 1 second.

## Examples:

* Github issues zeit button: (github)[https://github.com/zeit-io/browser-plugin/tree/main/src/extension-integrations/integrations/github].
* Gitlab issues zeit button: (gitlab)[https://github.com/zeit-io/browser-plugin/tree/main/src/extension-integrations/integrations/gitlab].
* Jira issues zeit button: (jira)[https://github.com/zeit-io/browser-plugin/tree/main/src/extension-integrations/integrations/jira].
