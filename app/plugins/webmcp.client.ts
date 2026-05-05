/**
 * WebMCP plugin — exposes site actions to AI agents via the browser's
 * navigator.modelContext API.
 * https://webmachinelearning.github.io/webmcp/
 */

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, {
      type: string;
      description: string;
      enum?: string[];
    }>;
    required?: string[];
  };
  execute: (input: Record<string, string>) => Promise<unknown> | unknown;
}

interface ModelContext {
  provideContext: (ctx: {tools: ModelContextTool[]}) => void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export default defineNuxtPlugin(() => {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;

  const router = useRouter();

  // Derive navigable paths from the shared sitePages list
  // (default locale only — the router handles locale switching separately).
  const navigablePaths = defaultLocalePages.map((p) => p.loc);

  const tools: ModelContextTool[] = [
    {
      name: 'navigate',
      description: 'Navigate to a page on the Twinkle AI website.',
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            description: 'The path to navigate to.',
            enum: navigablePaths,
          },
        },
        required: ['page'],
      },
      execute({page}) {
        return router.push(page);
      },
    },
    {
      name: 'get_site_info',
      description: 'Get general information about the Twinkle AI website.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute() {
        return {
          name: 'Twinkle AI',
          description: '致力於構建開源正體中文語言模型的研究社群，推動台灣生成式 AI 發展。',
          url: 'https://www.twinkleai.tw',
          github: 'https://github.com/ai-twinkle',
          huggingface: 'https://huggingface.co/twinkle-ai',
          discord: 'https://discord.com/servers/twinkle-ai-1310544431983759450',
        };
      },
    },
  ];

  navigator.modelContext.provideContext({tools});
});

