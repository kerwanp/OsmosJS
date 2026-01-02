import '@osmosjs/osmos'

declare module '@osmosjs/osmos' {
  namespace HTML {
    interface GlobalAttributes<T extends EventTarget> {
      /**
       * Enables keyboard interaction and other accessibility
       * behaviors for non-interactive elements that
       * represent clickable buttons.
       *
       * @see {@link https://unpoly.com/up-clickable}
       */
      'up-clickable'?: boolean | string

      /**
       * Activates this link-like element on mousedown instead of click ("Act on press").
       *
       * @see {@link https://unpoly.com/up-instant}
       */
      'up-instant'?: boolean

      /**
       * Follows this link with JavaScript and updates a fragment with the server response.
       * Following a link is considered navigation by default.
       *
       * @see {@link https://unpoly.com/up-follow}
       */
      'up-follow'?: boolean | string

      /**
       * Preloads this link before the user clicks it. When the link is clicked, the response will already be cached, making the interaction feel instant.
       * Unpoly will only preload links with safe methods.
       *
       * @see {@link https://unpoly.com/up-preload}
       */
      'up-preload'?: 'hover' | 'insert' | 'reveal' | false | boolean

      /**
       * With [up-preload="hover"], this requires the user to hover for the given number of milliseconds before the link is preloaded.
       *
       * @see {@link https://unpoly.com/up-preload#up-preload-delay}
       */
      'up-preload-delay'?: number | string

      /**
       * With [up-preload=reveal], this enlarges the viewport by the given number of pixels before computing the intersection.
       * A positive number will load the deferred content some pixels before it becomes visible.
       * A negative number will require the user to scroll some pixels into the element before it is loaded.
       *
       * @see {@link https://unpoly.com/up-preload#up-intersect-margin}
       */
      'up-intersect-margin'?: number | string

      /**
       * Follows this link as fast as possible.
       *
       * @see {@link https://unpoly.com/up-dash}
       * @deprecated use up.link.config.instantSelectors and up.link.config.preloadSelectors
       */
      'up-dash'?: boolean | string

      /**
       * Whether to load the deferred content in the background.
       * Background requests will not show the global progress bar.
       *
       * @see {@link https://unpoly.com/up-defer#up-background}
       */
      'up-background'?: boolean

      /**
       * Whether to read from and write to the cache.
       *
       * @see {@link https://unpoly.com/up-defer#up-cache}
       */
      'up-cache'?: boolean | 'auto'

      /**
       * Whether to reload the targeted fragment after it was rendered from a cached response.
       *
       * @see {@link https://unpoly.com/up-defer#up-revalidate}
       */
      'up-revalidate'?: boolean | 'auto'

      /**
       * The name of a preview that runs while revalidating cached content.
       *
       * @see {@link https://unpoly.com/up-defer#up-revalidate-preview}
       */
      'up-revalidate-preview'?: string

      /**
       * Whether existing cache entries will be expired with this request.
       *
       * @see {@link https://unpoly.com/up-defer#up-expire-cache}
       */
      'up-expire-cache'?: boolean | string

      /**
       * Whether existing cache entries will be evicted with this request.
       *
       * @see {@link https://unpoly.com/up-defer#up-evict-cache}
       */
      'up-evict-cache'?: boolean | string

      /**
       * Enlarges the click area of a descendant link.
       *
       * @see {@link https://unpoly.com/up-expand}
       */
      'up-extend'?: boolean | string

      /**
       * The target selector to update after a successful response.
       * If omitted a main target will be rendered.
       *
       * @see {@link https://unpoly.com/up-follow#up-target}
       */
      'up-target'?: true | string

      /**
       * The target selector to update when the server responds with an error code.
       * If omitted, a failed response will not update the [up-target], but update the main target instead.
       *
       * @see {@link https://unpoly.com/up-follow#up-fail-target}
       */
      'up-fail-target'?: true | string

      /**
       * Specifies behavior if the target selector is missing from the current page or the server response.
       *
       * @see {@link https://unpoly.com/up-follow#up-fallback}
       */
      'up-fallback'?: boolean | string

      /**
       * Controls which fragment to update when the [up-target] selector yields multiple results.
       *
       * @see {@link https://unpoly.com/up-follow#up-match}
       */
      'up-match'?: string

      /**
       * Whether [up-hungry] elements outside the updated fragment will also be updated.
       *
       * @see {@link https://unpoly.com/up-follow#up-use-hungry}
       */
      'up-use-hungry'?: boolean

      /**
       * Whether this fragment update is considered navigation.
       *
       * @see {@link https://unpoly.com/up-follow#up-navigate}
       */
      'up-navigate'?: boolean

      /**
       * The HTTP method to use for the request.
       *
       * @see {@link https://unpoly.com/up-follow#up-method}
       */
      'up-method'?: 'get' | 'post' | 'put' | 'patch' | 'delete'

      /**
       * A relaxed JSON object with additional parameters that should be sent as the request's query string or payload.
       *
       * @see {@link https://unpoly.com/up-follow#up-params}
       */
      'up-params'?: string

      /**
       * A relaxed JSON object with additional request headers.
       *
       * @see {@link https://unpoly.com/up-follow#up-headers}
       */
      'up-headers'?: string

      /**
       * Whether to abort existing requests before rendering.
       *
       * @see {@link https://unpoly.com/up-follow#up-abort}
       */
      'up-abort'?: string

      /**
       * Whether this request may be aborted by other requests targeting the same fragments or layer.
       *
       * @see {@link https://unpoly.com/up-follow#up-abortable}
       */
      'up-abortable'?: boolean

      /**
       * The number of milliseconds after which this request can cause an up:network:late event.
       *
       * @see {@link https://unpoly.com/up-follow#up-late-delay}
       */
      'up-late-delay'?: number | string

      /**
       * The number of milliseconds after which this request fails with a timeout.
       *
       * @see {@link https://unpoly.com/up-follow#up-timeout}
       */
      'up-timeout'?: number | string

      /**
       * Whether to render failed responses differently.
       * For failed responses Unpoly will use attributes prefixed with up-fail, e.g. [up-fail-target].
       *
       * @see {@link https://unpoly.com/up-follow#up-fail}
       */
      'up-fail'?: boolean

      /**
       * The new inner HTML for the targeted fragment.
       * Instead of making a server request, you may also render an existing string of HTML.
       *
       * @see {@link https://unpoly.com/up-follow#up-content}
       */
      'up-content'?: string

      /**
       * A string of HTML comprising only the new fragment's outer HTML.
       * With an [up-fragment] attribute you can omit the [up-target] attribute.
       *
       * @see {@link https://unpoly.com/up-follow#up-fragment}
       */
      'up-fragment'?: string

      /**
       * A string of HTML containing the targeted fragment.
       *
       * @see {@link https://unpoly.com/up-follow#up-document}
       */
      'up-document'?: string

      /**
       * The URL to fetch from the server.
       * To use a different URL when a link is followed through Unpoly (as opposed to a browser's full page load), set an [up-href] attribute.
       *
       * @see {@link https://unpoly.com/up-follow#href}
       */
      'up-href'?: string

      /**
       * The layer in which to match and render the fragment.
       *
       * @see {@link https://unpoly.com/up-follow#up-layer}
       */
      'up-layer'?: string

      /**
       * The layer in which render if the server responds with an error code.
       *
       * @see {@link https://unpoly.com/up-follow#up-fail-layer}
       */
      'up-fail-layer'?: string

      /**
       * Whether to close overlays obstructing the updated layer when the fragment is updated.
       *
       * @see {@link https://unpoly.com/up-follow#up-peel}
       */
      'up-peel'?: boolean

      /**
       * Whether the browser URL, window title and meta tags will be updated.
       *
       * @see {@link https://unpoly.com/up-follow#up-history}
       */
      'up-history'?: boolean | 'auto'

      /**
       * The title to use when updating history.
       *
       * @see {@link https://unpoly.com/up-follow#up-title}
       */
      'up-title'?: string

      /**
       * The URL to use when updating history.
       *
       * @see {@link https://unpoly.com/up-follow#up-location}
       */
      'up-location'?: string

      /**
       * Whether to update history when the server responds with an error code.
       *
       * @see {@link https://unpoly.com/up-submit#up-fail-history}
       */
      'up-fail-history'?: boolean | 'auto'

      /**
       * Whether to update meta tags in the `<head>`.
       * By default Unpoly will extract meta tags from the response's `<head>`. To prevent meta tags from being updated, set `[up-meta-tags=false]`.
       * This attribute is only used when updating history.
       *
       * @see {@link https://unpoly.com/up-submit#up-meta-tags}
       */
      'up-meta-tags'?: boolean

      /**
       * An explicit language code to set as the html[lang] attribute.
       * By default Unpoly will extract the language from the response and update the `html[lang]` attribute in the current page. To prevent the attribute from being changed, set `[up-lang=false]`.
       * This attribute is only used when updating history.
       *
       * @see {@link https://unpoly.com/up-submit#up-lang}
       */
      'up-lang'?: string | false

      /**
       * The name of a transition to use when updating fragments.
       *
       * @see {@link https://unpoly.com/up-follow#up-transition}
       */
      'up-transition'?: string

      /**
       * The transition to use when the server responds with an error code.
       *
       * @see {@link https://unpoly.com/up-transition#up-fail-transition}
       */
      'up-fail-transition'?: string

      /**
       * The name of an animation to use when updating fragments.
       *
       * @see {@link https://unpoly.com/up-follow#up-animation}
       */
      'up-animation'?: string

      /**
       * The duration of the transition or animation (in milliseconds).
       *
       * @see {@link https://unpoly.com/up-follow#up-duration}
       */
      'up-duration'?: number | string

      /**
       * The timing function that accelerates the transition or animation.
       *
       * @see {@link https://unpoly.com/up-follow#up-easing}
       */
      'up-easing'?: string

      /**
       * How to scroll after the new fragment was rendered.
       *
       * @see {@link https://unpoly.com/up-follow#up-scroll}
       */
      'up-scroll'?: boolean | 'auto' | 'restore' | string

      /**
       * How to scroll after the new fragment was rendered from a failed response.
       *
       * @see {@link https://unpoly.com/up-follow#up-fail-scroll}
       */
      'up-fail-scroll'?: boolean | 'auto' | 'restore' | string

      /**
       * Whether to animate the scroll motion when prepending or appending content.
       *
       * @see {@link https://unpoly.com/up-follow#up-scroll-behavior}
       */
      'up-scroll-behavior'?: 'instant' | 'smooth' | string

      /**
       * When to snap to the top when scrolling to an element near the top edge of the viewport's scroll buffer.
       *
       * @see {@link https://unpoly.com/up-follow#up-reveal-snap}
       */
      'up-reveal-snap'?: boolean | string

      /**
       * When to move a revealed element to the top when scrolling to an element.
       *
       * @see {@link https://unpoly.com/up-follow#up-reveal-top}
       */
      'up-reveal-top'?: boolean | string

      /**
       * How much space to leave to the closest viewport edge when scrolling to an element.
       *
       * @see {@link https://unpoly.com/up-follow#up-reveal-padding}
       */
      'up-reveal-padding'?: number | string

      /**
       * How many pixel lines of high element to reveal when scrolling to an element.
       *
       * @see {@link https://unpoly.com/up-follow#up-reveal-max}
       */
      'up-reveal-max'?: number | string

      /**
       * Whether to save scroll positions before updating the fragment.
       * Saved scroll positions can later be restored with [up-scroll=restore].
       *
       * @see {@link https://unpoly.com/up-follow#up-save-scroll}
       */
      'up-save-scroll'?: boolean

      /**
       * What to focus after the new fragment was rendered.
       *
       * @see {@link https://unpoly.com/up-follow#up-focus}
       */
      'up-focus'?: boolean | 'auto' | 'restore' | string

      /**
       * What to focus after the new fragment was rendered from a failed response.
       *
       * @see {@link https://unpoly.com/up-follow#up-fail-focus}
       */
      'up-fail-focus'?: boolean | 'auto' | 'restore' | string

      /**
       * Whether the focused element should have a visible focus ring.
       *
       * @see {@link https://unpoly.com/up-follow#up-focus-visible}
       */
      'up-focus-visible'?: boolean | 'auto'

      /**
       * Whether to save focus-related state before updating the fragment.
       * Saved scroll positions can later be restored with [up-focus=restore].
       *
       * @see {@link https://unpoly.com/up-follow#up-save-focus}
       */
      'up-save-focus'?: boolean

      /**
       * Disables form controls while the link is loading.
       *
       * @see {@link https://unpoly.com/up-follow#up-disable}
       */
      'up-disable'?: boolean | string

      /**
       * A placeholder to show in the targeted fragment while new content is loading.
       * Links or forms can define a placeholder that will be shown within the targeted fragment while loading content from the server.
       * All other children of the targeted fragment will be hidden while the request is in flight. When the request ends for any reason, the placeholder will be removed and the original fragment children will be un-hidden.
       * The HTML string for the placeholder. You can also use a template by setting this attribute to a CSS selector matching a <template> or <script> element.
       *
       * @see {@link https://unpoly.com/up-placeholder}
       */
      'up-placeholder'?: string

      /**
       * Links or forms can name a preview function that is called while loading content from the server.
       * When the user interacts with a link or form, its preview function is invoked immediately. The function will usually mutate the DOM to signal that the app is working, or to provide clues for how the page will ultimately look.
       * The name of a preview function defined with up.preview(). To call multiple previews, separate names with a comma.
       * Preview options can be appended after each preview name, encoded as Relaxed JSON.
       *
       * @see {@link https://unpoly.com/up-preview}
       */
      'up-preview'?: string

      /**
       * Whether to set feedback classes while loading content.
       *
       * @see {@link https://unpoly.com/up-follow#up-feedback}
       */
      'up-feedback'?: boolean

      /**
       * A relaxed JSON object that overrides properties from the new fragment's data.
       *
       * @see {@link https://unpoly.com/up-follow#up-use-data}
       */
      'up-use-data'?: string

      /**
       * Whether [up-keep] elements will be preserved in the updated fragments.
       *
       * @see {@link https://unpoly.com/up-follow#up-use-keep}
       */
      'up-use-keep'?: boolean

      /**
       * A relaxed JSON object that will be merged into the context of the current layer once the fragment is rendered.
       *
       * @see {@link https://unpoly.com/up-follow#up-context}
       */
      'up-context'?: string

      /**
       * A message the user needs to confirm before any request or changes are made.
       *
       * @see {@link https://unpoly.com/up-follow#up-confirm}
       */
      'up-confirm'?: string

      /**
       * A JavaScript snippet that is executed when the server responds with new HTML, but before the HTML is rendered.
       *
       * @see {@link https://unpoly.com/up-follow#up-on-loaded}
       */
      'up-on-loaded'?: string

      /**
       * A JavaScript snippet that is executed when the fragment could not be loaded due to a disconnect or timeout.
       *
       * @see {@link https://unpoly.com/up-follow#up-on-offline}
       */
      'up-on-offline'?: string

      /**
       * A JavaScript snippet that is executed when Unpoly has updated fragments.
       *
       * @see {@link https://unpoly.com/up-follow#up-on-rendered}
       */
      'up-on-rendered'?: string

      /**
       * A JavaScript snippet that is executed when no further DOM changes will be caused by this render pass.
       *
       * @see {@link https://unpoly.com/up-follow#up-on-finished}
       */
      'up-on-finished'?: string

      /**
       * A JavaScript snippet that is run when any error is thrown during the rendering process.
       *
       * @see {@link https://unpoly.com/up-follow#up-on-error}
       */
      'up-on-error'?: string

      /**
       * Automatically submits a form when a field changes.
       *
       * @see {@link https://unpoly.com/up-autosubmit}
       */
      'up-autosubmit'?: boolean

      /**
       * The type of event to watch.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-event}
       */
      'up-watch-event'?: string

      /**
       * The number of milliseconds to wait after a change.
       * This can be used to batch multiple events within a short time span.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-delay}
       */
      'up-watch-delay'?: number | string

      /**
       * Whether to disable fields while a request is loading.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-disable}
       */
      'up-watch-disable'?: boolean | string

      /**
       * A placeholder to show within the targeted fragment while a request is loading.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-placeholder}
       */
      'up-watch-placeholder'?: string

      /**
       * One or more previews that temporarily change the page while a request is loading.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-preview}
       */
      'up-watch-preview'?: string

      /**
       * Whether to set feedback classes while a request is loading.
       *
       * @see {@link https://unpoly.com/up-autosubmit#up-watch-feedback}
       */
      'up-watch-feedback'?: boolean

      /**
       * Disables this element while an input field with [up-switch] has one of the given values.
       *
       * @see {@link https://unpoly.com/up-disable-for}
       */
      'up-disable-for'?: string

      /**
       * Enables this element while an input field with [up-switch] has one of the given values.
       *
       * @see {@link https://unpoly.com/up-disable-for}
       */
      'up-enable-for'?: string

      /**
       * Marks this element as a from group, which (usually) contains a label, input and error message.
       *
       * @see {@link https://unpoly.com/up-form-group}
       */
      'up-form-group'?: string

      /**
       * Hides this element while an input field with [up-switch] has one of the given values.
       *
       * @see {@link https://unpoly.com/up-hide-for}
       */
      'up-hide-for'?: string

      /**
       * Only shows this element while an input field with [up-switch] has one of the given values.
       *
       * @see {@link https://unpoly.com/up-show-for}
       */
      'up-show-for'?: string

      /**
       * Submits this form via JavaScript and updates a fragment with the server response.
       *
       * @see {@link https://unpoly.com/up-submit}
       */
      'up-submit'?: boolean

      /**
       * Controls the state of another element when this field changes.
       * A CSS selector for elements whose state depends on this field's value.
       *
       * @see {@link https://unpoly.com/up-switch}
       */
      'up-switch'?: string

      /**
       * A selector for the region in which elements are switched.
       * By default all matching elements within the form are switched. You can expand or narrow the search scope by configuring a different selector.
       *
       * @see {@link https://unpoly.com/up-switch#up-switch-region}
       */
      'up-switch-region'?: string

      /**
       * Renders a new form state when a field changes, to show validation errors or update dependent elements.
       * The target selector to update with the server response. Defaults to the closest form group around the validating field.
       *
       * @see {@link https://unpoly.com/up-validate}
       */
      'up-validate'?: boolean | string

      /**
       * The URL to which to submit the validation request.
       * By default Unpoly will use the form's [action] attribute.
       *
       * @see {@link https://unpoly.com/up-validate#up-validate-url}
       */
      'up-validate-url'?: string

      /**
       * The method to use for submitting the validation request.
       * By default Unpoly will use the form's [method] attribute.
       *
       * @see {@link https://unpoly.com/up-validate#up-validate-method}
       */
      'up-validate-method'?: 'get' | 'post' | 'put' | 'patch' | 'delete'

      /**
       * Additional Form parameters that should be sent as the request's query string or payload.
       * The given value will be added to params parsed from the form's input fields. If a param with the same name already existed in the form, it will be deleted and overridden with the given value.
       *
       * @see {@link https://unpoly.com/up-validate#up-validate-params}
       */
      'up-validate-params'?: string

      /**
       * A relaxed JSON object with additional request headers.
       * By default Unpoly will send an X-Up-Validate header so the server can distinguish the validation request from a regular form submission.
       *
       * @see {@link https://unpoly.com/up-validate#up-validate-headers}
       */
      'up-validate-headers'?: string

      /**
       * Whether to consolidate multiple validations into a single request.
       *
       * @see {@link https://unpoly.com/up-validate#up-validate-batch}
       */
      'up-validate-batch'?: boolean

      /**
       * Watches form fields and runs a callback when a value changes.
       * The code to run when any field's value changes. Only fields with a [name] attribute can be watched.
       *
       * @see {@link https://unpoly.com/up-watch}
       */
      'up-watch'?: string

      /**
       * Accepts the current layer when this element is clicked or submitted.
       * On buttons and links, the overlay's acceptance value as a relaxed JSON string.
       * If the attribute value is omitted, a value null will be used.
       *
       * @see {@link https://unpoly.com/up-accept}
       */
      'up-accept'?: boolean | string

      /**
       * Dismisses the current layer when this element is clicked or submitted.
       * On buttons and links, the overlay's dismissal value as a relaxed JSON string.
       *
       * @see {@link https://unpoly.com/up-dismiss}
       */
      'up-dismiss'?: boolean | string

      /**
       * For popups, the position of the popup relative to the link or button that opened the overlay.
       * For drawers, the screen edge on which to position the drawer (left or right).
       *
       * @see {@link https://unpoly.com/up-layer-new#up-position}
       */
      'up-position'?: string

      /**
       * For popups, the alignment of the popup within its position.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-align}
       */
      'up-align'?: string

      /**
       * The kind of overlay to open. Defaults to up.layer.config.mode, which defaults to 'modal'.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-mode}
       */
      'up-mode'?: string

      /**
       * The size of the overlay.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-size}
       */
      'up-size'?: string

      /**
       * An optional HTML class for the overlay's container element.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-class}
       */
      'up-class'?: string

      /**
       * How the overlay may be dismissed by the user.
       * You may enable multiple dismiss controls by separating values with a space or comma character.
       * Passing true or false will enable or disable all dismiss controls.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-dismissable}
       */
      'up-dismissable'?: boolean | string

      /**
       * The name of the closing animation.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-close-animation}
       */
      'up-close-animation'?: string

      /**
       * The timing function that controls the closing animation's acceleration.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-close-easing}
       */
      'up-close-easing'?: string

      /**
       * The duration of the closing animation in milliseconds.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-close-duration}
       */
      'up-close-duration'?: number | string

      /**
       * An event type that will cause this overlay to automatically be accepted when a matching event occurs within the overlay.
       * You may listen to multiple event types by separating types with a space or comma.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-accept-event}
       */
      'up-accept-event'?: string

      /**
       * An event type that will cause this overlay to automatically be dismissed when a matching event occurs within the overlay.
       * You may listen to multiple event types by separating types with a space or comma.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-dismiss-event}
       */
      'up-dismiss-event'?: string

      /**
       * One or more space-separated URL patterns that will cause this overlay to automatically be accepted when the overlay reaches a matching location.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-accept-location}
       */
      'up-accept-location'?: string

      /**
       * One or more space-separated URL patterns that will cause this overlay to automatically be dismissed when the overlay reaches a matching location.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-dismiss-location}
       */
      'up-dismiss-location'?: string

      /**
       * A JavaScript snippet that is called when the overlay was inserted into the DOM.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-on-opened}
       */
      'up-on-opened'?: string

      /**
       * A JavaScript snippet that is called when the overlay was accepted.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-on-accepted}
       */
      'up-on-accepted'?: string

      /**
       * A JavaScript snippet that is called when the overlay was dismissed.
       *
       * @see {@link https://unpoly.com/up-layer-new#up-on-dismissed}
       */
      'up-on-dismissed'?: string

      /**
       * Sets an ETag for the fragment's underlying data.
       * ETags can be used to skip unnecessary rendering of unchanged content. This is useful for reloading, cache revalidation and polling.
       * You can also set the value to "false" to prevent a If-None-Match request header when reloading this fragment.
       *
       * @see {@link https://unpoly.com/up-etag}
       */
      'up-etag'?: string | false

      /**
       * Sets a unique identifier for this element.
       * This identifier is used in target derivation to create a CSS selector that matches this element precisely.
       * If the element already has other attributes that make a good identifier, like a good [id] or [class] attribute, it is not necessary to also set [up-id].
       *
       * @see {@link https://unpoly.com/up-id}
       */
      'up-id'?: string

      /**
       * Elements with an [up-keep] attribute will be persisted when rendering.
       * When set to 'true' (the default), the element is kept as long as its derived target can be correlated in both the old and new content.
       * When set to 'same-html', the element is kept as long as its outer HTML does not change between versions.
       * When set to 'same-data', the element is kept as long as its [data] does not change between versions.
       * When set to 'false' the element is never kept. A new element with [up-keep="false"] will always replace an existing element, even if that existing element has [up-keep="true"].
       *
       * @see {@link https://unpoly.com/up-keep}
       */
      'up-keep'?: boolean | 'same-html' | 'same-data' | string

      /**
       * Code to run before an existing element is kept during a page update.
       * Calling event.preventDefault() will prevent the element from being kept. It will then be swapped with newFragment.
       *
       * @see {@link https://unpoly.com/up-keep#up-on-keep}
       */
      'up-on-keep'?: string

      /**
       * Marks this element as the primary content element of your application layout.
       * Unpoly will update a main element when no more specific render target is given.
       * A space-separated list of layer modes for which to use this main target.
       * Omit the attribute value to define a main target for all layer modes.
       * To use a different main target for all overlays (but not the root layer), set [up-main=overlay].
       *
       * @see {@link https://unpoly.com/up-main}
       */
      'up-main'?: boolean | string

      /**
       * The URL from which this element and its descendants were initially requested.
       * When Unpoly inserts a fragment, the [up-source] attribute is automatically set to the URL from which the fragment's HTML was loaded.
       * When an element is reloaded or polled, Unpoly will request the URL from the closest [up-source] attribute.
       * The [up-source] attribute is only set for GET requests.
       * To indicate a different source URL for a fragment (and its descendants), manually set [up-source] attribute.
       *
       * @see {@link https://unpoly.com/up-source}
       */
      'up-source'?: string

      /**
       * Sets the time when the fragment's underlying data was last changed.
       * When the fragment is reloaded, its known modification time is sent as an If-Modified-Since request header. The server may check the header and decide to skip rendering.
       * The value can either be a Unix timestamp (e.g. "1445412480") or an RFC 1123 time (e.g. "Wed, 21 Oct 2015 07:28:00 GMT").
       * You can also set the value to "false" to prevent a If-Modified-Since request header when reloading this fragment.
       *
       * @see {@link https://unpoly.com/up-time}
       */
      'up-time'?: string | false

      /**
       * Use an [up-flashes] element to show confirmations, alerts or warnings.
       * Your application layout should have an empty [up-flashes] element to indicate where flash messages should be inserted.
       * To render a flash message, include an [up-flashes] element in your response. The element's content should be the messages you want to render.
       *
       * @see {@link https://unpoly.com/up-flashes}
       */
      'up-flashes'?: boolean

      /**
       * Elements with an [up-hungry] attribute are updated whenever the server sends a matching element, even if the element isn't targeted.
       * Hungry elements are optional in the same way as :maybe targets. When an [up-hungry] element does not match in the server response, the element will not be updated, but no error is thrown.
       *
       * @see {@link https://unpoly.com/up-hungry}
       */
      'up-hungry'?: boolean

      /**
       * Only piggy-back on updates on layers that match the given layer reference.
       * Relative references like 'parent' or 'child' will be resolved in relation to the hungry element's layer.
       * To match a hungry element when updating one of multiple layers, separate the references using an 'or' delimiter. For example, 'current or child' will match for updates on either the hungry element's layer, or its direct child.
       * To match a hungry element when updating any layer, set this attribute to 'any'.
       *
       * @see {@link https://unpoly.com/up-hungry#up-if-layer}
       */
      'up-if-layer'?: string

      /**
       * Code to run before this element is included in a fragment update.
       * Calling event.preventDefault() will prevent the hungry fragment from being updated.
       *
       * @see {@link https://unpoly.com/up-hungry#up-on-hungry}
       */
      'up-on-hungry'?: string

      /**
       * Elements with an [up-poll] attribute are reloaded from the server periodically.
       *
       * @see {@link https://unpoly.com/up-poll}
       */
      'up-poll'?: boolean

      /**
       * The reload interval in milliseconds.
       * Defaults to up.radio.config.pollInterval, which defaults to 30 seconds.
       *
       * @see {@link https://unpoly.com/up-poll#up-interval}
       */
      'up-interval'?: number | string

      /**
       * Whether to preserve the polling fragment's data object through reloads.
       *
       * @see {@link https://unpoly.com/up-poll#up-keep-data}
       */
      'up-keep-data'?: boolean

      /**
       * Links within navigational containers may use the [up-alias] attribute to alternative URLs for which they should also be highlighted as .up-current.
       * A URL pattern with alternative URLs. To configure multiple alternative URLs, use a URL pattern.
       *
       * @see {@link https://unpoly.com/up-alias}
       */
      'up-alias'?: string

      /**
       * Marks this element as a navigational container, such as a menu or navigation bar.
       * When a link within an [up-nav] element points to its layer's location, it is assigned the .up-current class. When the browser navigates to another location, the class is removed automatically.
       *
       * @see {@link https://unpoly.com/up-nav}
       */
      'up-nav'?: boolean

      /**
       * Emits a custom event when this element is clicked.
       * The event is emitted on this element and bubbles up the document. To listen to the event, use addEventListener() or up.on() on the element, or on its ancestors.
       * The type of the event to be emitted, e.g. 'my:event'.
       * While the [up-emit] attribute is often used with an <a> or <button> element, you can also apply it to non-interactive elements, like a <span>.
       *
       * @see {@link https://unpoly.com/up-emit}
       */
      'up-emit'?: string

      /**
       * The event properties, serialized as relaxed JSON.
       * By default [up-emit] will emit an event with only basic properties like { target }.
       * To set custom properties on the event object, encode them as relaxed JSON in an [up-emit-props] attribute.
       *
       * @see {@link https://unpoly.com/up-emit#up-emit-props}
       */
      'up-emit-props'?: string

      /**
       * Marks this element as being anchored to the right edge of the screen, typically fixed navigation bars.
       * Since overlays hide the document scroll bar, elements anchored to the right appear to jump when the dialog opens or closes. Applying this attribute to anchored elements will make Unpoly aware of the issue and adjust the right property accordingly.
       * You may customize this behavior by styling the .up-scrollbar-away class.
       * Instead of giving this attribute to any affected element, you can also configure a selector in up.viewport.config.anchoredRightSelectors.
       * Elements with [up-fixed=top] or [up-fixed=bottom] are also considered to be right-anchored.
       *
       * @see {@link https://unpoly.com/up-anchored-right}
       */
      'up-anchored'?: 'right' | string

      /**
       * Marks this element as being fixed to the top or bottom edge of the screen using position: fixed.
       * When following a fragment link, the viewport is scrolled so the targeted element becomes visible. By using this attribute you can make Unpoly aware of fixed elements that are obstructing the viewport contents. Unpoly will then scroll the viewport far enough that the revealed element is fully visible.
       * Instead of using this attribute, you can also configure a selector in up.viewport.config.fixedTopSelectors or up.viewport.config.fixedBottomSelectors.
       * You can use [up-fixed] on elements with position: sticky. Unpoly will measure sticky elements like permanently fixed elements. The current scroll position is not taken into account.
       *
       * @see {@link https://unpoly.com/up-fixed-top}
       * @see {@link https://unpoly.com/up-fixed-bottom}
       */
      'up-fixed'?: 'top' | 'bottom' | string

      /**
       * Marks this element as a scrolling container ("viewport").
       * Apply this attribute if your app uses a custom panel layout with fixed positioning instead of scrolling the <body> element. As an alternative you can also push a selector matching your custom viewport to the up.viewport.config.viewportSelectors array.
       * When scrolling Unpoly will always scroll the viewport closest to the updated element. By default this is the <body> element.
       * Elements with the [up-viewport] attribute must also have a derivable target selector.
       *
       * @see {@link https://unpoly.com/up-viewport}
       */
      'up-viewport'?: boolean

      /**
       * Changes the link's destination so it points to the previous URL.
       * If no previous URL is known, the link will not be changed.
       * Clicking an [up-back] link will not call history.back(). Instead the link will navigate to the previous URL.
       *
       * @see {@link https://unpoly.com/up-back}
       */
      'up-back'?: boolean

      /**
       * Configures whether this <head> element is updated during history changes.
       * To update additional <head> elements during history changes, mark them with an [up-meta] attribute. Only elements in the <head> can be matched this way.
       * To preserve a <head> element during history changes, set an [up-meta=false] attribute.
       * To include additional elements by default, configure up.history.config.metaTagSelectors.
       * To exclude elements by default, configure up.history.config.noMetaTagSelectors.
       *
       * @see {@link https://unpoly.com/up-meta}
       */
      'up-meta'?: boolean

      /**
       * Prevent Unpoly from booting automatically.
       * By default Unpoly automatically boots on DOMContentLoaded. To prevent this, add an [up-boot="manual"] attribute to the <html> element.
       * You may then call up.boot() to manually boot Unpoly at a later time.
       * This feature is experimental.
       *
       * @see {@link https://unpoly.com/up-boot-manual}
       */
      'up-boot'?: 'manual' | string
    }
  }
}
