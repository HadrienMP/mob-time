let separator = ",";
exports.isOn = (feature, serverFeatures, mobFeatures) =>
    (serverFeatures + separator + mobFeatures).split(separator)
                                              .some(activeFeature => activeFeature === feature)

exports.activate = (features, rawMobFeatures, legalFeatures) => {
    let updated = rawMobFeatures === "" ? [] : rawMobFeatures.split(separator);

    (features || "").split(separator)
                    .filter(feature => legalFeatures.includes(feature))
                    .filter(feature => !rawMobFeatures.includes(feature))
                    .forEach(feature => updated.push(feature));
    return updated.join(separator)
}

exports.clean = (mobFeatures, legalFeatures) =>
    mobFeatures.split(separator)
               .filter(value => legalFeatures.includes(value))
               .join(separator)