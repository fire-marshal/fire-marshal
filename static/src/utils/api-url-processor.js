import _ from 'lodash'

/**
 * process url template and replace any {{key}} with value of passed key-value
 *
 * @param template
 * @param config
 * @private
 * @returns {*}
 */
function processUrlTemplate (template, config) {
  return _.reduce(config, (res, value, key) => {
    if (value === undefined || value === null) {
      value = ''
    }

    if (typeof value === 'object') {
      value = Object.keys(value)
        .map((key) => `${key}=${value[key]}`)
        .join('&')
    }
    return res.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }, template)
}

/**
 * process api endpoint url to valid url with config values
 *
 * @param template
 * @param config
 * @returns {*}
 */
export function prepareUrl (template, config) {
  if (typeof template === 'string') {
    return processUrlTemplate(template, config)
  } else {
    return {
      crossDomain: template.cross_domain,
      url: processUrlTemplate(template.url, config)
    }
  }
}
