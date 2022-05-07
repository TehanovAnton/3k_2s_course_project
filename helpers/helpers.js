function companiesIndexPath() {
  return '/companies/index';
}

function companiesNewPath() {
  return '/companies/new';
}

function companiesCreatePath() {
  return '/companies/create';
}

function companiesEditPath(id, activate = true) {
  return activate ? `/companies/${id}/edit` : '#';
}

function companiesUpdatePath(id) {
  return `/companies/${id}/update`;
}

function companiesDeletePath(id) {
  return `/companies/${id}/delete`;
}

module.exports = {
  companiesIndexPath,
  companiesNewPath,
  companiesCreatePath,
  companiesEditPath,
  companiesUpdatePath,
  companiesDeletePath,
};
