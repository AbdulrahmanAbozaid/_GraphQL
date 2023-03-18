const User = require("./user.model");

// LIST

exports.list = async () => {
  let users = await User.find({});
  return {
    code: 200,
    success: true,
    users,
  };
};

// CREATE

exports.create = async (form) => {
  let found = await this.get({ email: form.email });
  if (!found.success) {
    let user = new User(form);
    await user.save();
    return {
      code: 200,
      success: true,
      user,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "User Already Exists",
    };
  }
};

// DELETE

exports.delete = async (id) => {
  let found = await this.getById(id);
  if (found.success) {
    await User.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User Not Found!",
    };
  }
};

// UPDATE

exports.update = async (id, form) => {
  await User.findByIdAndUpdate(id, form);
  let { user } = await this.getById(id);
  if (user) {
    return {
      code: 200,
      success: true,
      user,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User Not Found!",
    };
  }
};

// GET_BY_ID

exports.getById = async (id) => {
  let user = await User.findById(id);
  if (user) {
    return {
      code: 200,
      success: true,
      user,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User Not Found!",
    };
  }
};

// GET_RECORD

exports.get = async (filter) => {
  let user = await User.findOne(filter);
  if (user) {
    return {
      code: 200,
      success: true,
      user,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User Not Found!",
    };
  }
};

// GET_PAGINATED_SET

exports.getPaginated = async (page = 1, size = 5) => {
  let skipped = (+page - 1) * size;
  let users = await User.find({}).skip(skipped).limit(size);
  return {
    code: 200,
    success: true,
    users,
  };
};
