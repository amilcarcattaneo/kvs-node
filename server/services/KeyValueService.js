const KeyValue = require("../models/keyvalue");

class KeyValueService {
  async getValue(key) {
    const value = await KeyValue.findOne({ key: key }).lean();

    if (!value) {
      return {
        value: null,
        err: { type: 404, error: new Error("key not found") }
      };
    }

    return { value: value.value, err: null };
  }

  async setValue(keyvalue) {
    const response = await KeyValue.updateOne(
      { key: keyvalue.key },
      { value: keyvalue.value },
      { upsert: true }
    );

    if (!response) {
      return { err: { type: 500, error: new Error("key-valye not saved") } };
    }

    return { err: null };
  }
}

module.exports = KeyValueService;
