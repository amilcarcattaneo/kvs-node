class KeyValueController {
  constructor(keyvalueService) {
    this.keyvalueService = keyvalueService;
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  async getValue(req, res) {
    const key = req.params.key;
    if (!key || key.trim().length === 0) {
      return res.status(400).json({ details: "key is undefined" });
    }
    const { value, err } = await this.keyvalueService.getValue(key);
    if (err) {
      return res.status(err.type).json({ details: err.error.message });
    }

    return res.status(200).json({ value: value });
  }

  async setValue(req, res) {
    const { key, value } = req.body;

    if (!key || key.trim().length === 0) {
      return res.status(400).json({ details: "key is undefined" });
    }
    if (!value || value.trim().length === 0) {
      return res.status(400).json({ details: "value is undefined" });
    }

    const { err } = await this.keyvalueService.setValue({ key, value });
    if (err) {
      return res.status(err.type).json({ details: err.error.message });
    }

    return res.status(201).json({ details: "success" });
  }
}

module.exports = KeyValueController;
