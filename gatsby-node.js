const fetch = require("node-fetch")
const crypto = require("crypto")

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  if (!pluginOptions.apiKey)
    return reporter.panic(
      "gatsby-source-hubspot-forms: You must provide your HubSpit API key"
    )
}

exports.sourceNodes = async ({ boundActionCreators }, pluginOptions) => {
  try {
    const { createNode } = boundActionCreators
    const fetchAllFormNodes = await axios.get(
      `https://api.hubapi.com/forms/v2/forms?hapikey=${pluginOptions.apiKey}`
    )
    const response = await fetchAllFormNodes.data

    response.map((item, index) => {
      const formNode = {
        id: item.guid,
        portalId: item.portalId.toString(),
        guid: item.guid,
        name: item.name,
        action: item.action,
        method: item.method,
        cssClass: item.cssClass,
        redirect: item.redirect,
        submitText: item.submitText,
        followUpId: item.followUpId,
        notifyRecipients: item.notifyRecipients,
        leadNurturingCampaignId: item.leadNurturingCampaignId,
        formFieldGroups: item.formFieldGroups,
        children: [],
        parent: `__SOURCE__`,
        internal: {
          type: `HubspotForm`,
        },
      }
      console.log(` ${index + 1} :Creating Hubspot Form  ${item.name}`)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(formNode))
        .digest(`hex`)
      formNode.internal.contentDigest = contentDigest
      createNode(formNode)
    })
    return
  } catch (err) {
    throw new Error(err)
  }
}
