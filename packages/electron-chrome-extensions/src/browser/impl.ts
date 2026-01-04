/** App-specific implementation details for extensions. */
export interface ChromeExtensionImpl {
  createTab?(
    details: chrome.tabs.CreateProperties,
  ): Promise<[Electron.WebContents, Electron.BaseWindow]>
  selectTab?(tab: Electron.WebContents, window: Electron.BaseWindow): void
  removeTab?(tab: Electron.WebContents, window: Electron.BaseWindow): void

  /**
   * Populate additional details to a tab descriptor which gets passed back to
   * background pages and content scripts.
   */
  assignTabDetails?(details: chrome.tabs.Tab, tab: Electron.WebContents): void

  createWindow?(details: chrome.windows.CreateData): Promise<Electron.BaseWindow>
  removeWindow?(window: Electron.BaseWindow): void

  requestPermissions?(
    extension: Electron.Extension,
    permissions: chrome.permissions.Permissions,
  ): Promise<boolean>

  /**
   * Open a browser action popup for an extension.
   * Return the popup view/window instance, or undefined to use default implementation.
   */
  openPopup?(
    extensionId: string,
    url: string,
    options: {
      session: Electron.Session
      parent: Electron.BaseWindow
      anchorRect: { x: number; y: number; width: number; height: number }
      alignment?: string
    },
  ): Promise<any> | any

  /**
   * Close a browser action popup that was created by the custom openPopup implementation.
   * Only called for popups created by custom openPopup, not for default PopupView instances.
   */
  closePopup?(extensionId: string, view: any): Promise<void> | void
}
