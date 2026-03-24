export function request(ctx) {
  const { prompt } = ctx.args;

  return {
    resourcePath: `/model/moonshotai.kimi-k2.5/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        schemaVersion: "messages-v1",
        messages: [
          {
            role: "user",
            content: [
              {
                text: prompt,
              },
            ],
          },
        ],
        inferenceConfig: {
          maxTokens: 1000,
        },
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
