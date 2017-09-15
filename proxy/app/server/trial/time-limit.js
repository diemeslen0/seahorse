const config = require('../config/config');
const moment = require('moment');
const _ = require('underscore');

function trialTimeLimitedMiddleware(req, res, next) {
  const creationTimeString = config.getMandatory('SEAHORSE_CREATION_DATE');
  const createDateEnvFormat = 'YYYY-MM-DD';
  const seahorseCreationTime = moment(creationTimeString, createDateEnvFormat);

  const trialPeriod = moment.duration(8, 'weeks');

  const currentTime = moment();
  const expirationDateTime = seahorseCreationTime.add(trialPeriod);

  const outputTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

  const isTrialExpired = expirationDateTime.isBefore(currentTime);

  if(_.isUndefined(req.user)) {
    throw 'User must be defined in time-limit middleware';
  }

  const isCurrentUserAdmin = req.user.user_id == '172dce21-ea97-42cc-b2ff-30ce4ec7de9d';

  res.set('current-date-time', currentTime.format(outputTimeFormat));
  res.set('trial-expiration-date-time', expirationDateTime.format(outputTimeFormat));
  res.set('is-current-user-admin', isCurrentUserAdmin);
  console.log("Expiration date is ", expirationDateTime.format(outputTimeFormat))
  if (isTrialExpired) {
    if (!isCurrentUserAdmin) {
      res.redirect('/trial-expired.html');
      res.end();
      return
    }
  }

  return next()
}

module.exports = {
  middleware: trialTimeLimitedMiddleware,
};