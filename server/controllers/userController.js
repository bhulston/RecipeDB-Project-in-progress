const User = require('../models/User');

exports.createUser = async (req, res) => {
  const {email, password} = req.body;
  console.log('Attempting to save user')

  try {
    await User.updateOne(
      { email: email},
      { password: password},
      { upsert : true}
    )
    console.log('Successful!')
    res.send('User created!')
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'MongoDB request error', error});
  }
};

exports.verifyUser = async(req, res) => {
  const {email, password} = req.body;
  console.log('Checking password for user', email);
  
  try {
    const user = await User.findOne({ email: email });
    console.log('User found:', user);
    
    if (!user) {
      res.json({message: 'User not found', verified:false});
      return ;
    };

    if (user && user.password == password) {
      res.status(200).json({message:'User verified!', verified:true});
    } else {
      res.json({message: 'Invalid email/password!', verified:false});
    };

    console.log('Found user', user.email);
    console.log('Password is', user.password);

  } catch (error) {
    console.log('Error fetching user', error);
    res.status(500).json({message: 'Server error', verified:false});
  }
};
