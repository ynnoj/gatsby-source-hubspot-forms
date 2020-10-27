const fetch = require("node-fetch")

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  if (!pluginOptions.apiKey)
    return reporter.panic(
      "gatsby-source-hubspot-forms: You must provide your HubSpot API key"
    )
}

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, reporter },
  pluginOptions
) => {
  const activity = reporter.activityTimer(
    "gatsby-source-hubspot-forms: Fetching forms"
  )

  activity.start()

  try {
    const response = await fetch(
      `https://api.hubapi.com/forms/v2/forms?hapikey=${pluginOptions.apiKey}`
    )

    if (!response.ok) throw new Error(response.statusText)

    const forms = await response.json()

    return forms.forEach(form => {
      const formData = {
        ...form,
        id: form.guid,
        portalId: form.portalId.toString(),
      }

      createNode({
        ...formData,
        internal: {
          type: `HubSpotForm`,
          content: JSON.stringify(formData),
          contentDigest: createContentDigest(formData),
        },
      })
    })
  } catch (error) {
    reporter.panic("gatsby-source-hubspot-forms:", new Error(error))
  } finally {
    activity.end()
  }
}
