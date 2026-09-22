import { useConversationId } from "#/hooks/use-conversation-id";
import { BrowserSnapshot } from "./browser-snapshot";
import { BrowserChromeBar } from "./browser-chrome-bar";
import { EmptyBrowserMessage } from "./empty-browser-message";
import { useBrowserStore } from "#/stores/browser-store";

export function BrowserPanel() {
  const { url, screenshotSrc } = useBrowserStore();
  const { conversationId } = useConversationId();

  if (screenshotSrc) {
    const hasPage = Boolean(screenshotSrc);
    const imgSrc = screenshotSrc.startsWith("data:image/png;base64,")
      ? screenshotSrc
      : `data:image/png;base64,${screenshotSrc}`;

    return (
      <div className="flex h-full min-h-0 w-full flex-col text-muted">
        <BrowserChromeBar url={url} hasPage={hasPage} />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-hide bg-surface">
          <BrowserSnapshot src={imgSrc} />
        </div>
      </div>
    );
  }

  if (conversationId) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-surface">
        <iframe
          src={`/api/omicsbase/report/${conversationId}`}
          /* eslint-disable-next-line i18next/no-literal-string */
          title="OmicsBase Pipeline & Report"
          className="h-full w-full border-0"
        />
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 w-full flex-col text-muted">
      <BrowserChromeBar url={url} hasPage={false} />
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-hide bg-surface">
        <EmptyBrowserMessage />
      </div>
    </div>
  );
}
