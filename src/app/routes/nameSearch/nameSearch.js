var _ = require('lodash');
var async = require('async');

var rank = ['KINGDOM', 'PHYLUM', 'SUBPHYLUM', 'CLASS', 'SUBCLASS', 'ORDER', 'SUBORDER', 'SUPERFAMILY', 'FAMILY', 'SUBFAMILY', 'TRIBE', 'SUBTRIBE', 'GENUS', 'SUBGENUS', 'SECTION', 'SPECIES', 'SUBSPECIES', 'VARIETY', 'SUBVARIETY', 'FORM', 'SUBFORM'];
var nomstatus = ['LEGITIMATE', 'VARIANT', 'REPLACEMENT', 'CONSERVED', 'PROTECTED', 'UNAVAILABLE', 'NAKED', 'FORGOTTEN', 'ILLEGITIMATE', 'SUPERFLUOUS', 'REJECTED', 'DOUBTFUL', 'MANUSCRIPT', 'CHRESONYM', 'UNEVALUATED'];
var taxstatus = ['ACCEPTED', 'DOUBTFUL'];
var type = ['SCIENTIFIC', 'VIRUS', 'HYBRID-FORMULA', 'CULTIVAR', 'OTU', 'PLACEHOLDER', 'NONE'];
var issue = ['UNPARSABLE_NAME', 'PARTIALLY_PARSABLE_NAME', 'UNPARSABLE_AUTHORSHIP', 'DOUBTFUL_NAME', 'INCONSISTENT_AUTHORSHIP', 'INCONSISTENT_NAME', 'UNUSUAL_CHARACTERS', 'NULL_EPITHET', 'SUBSPECIES_ASSIGNED', 'LC_MONOMIAL', 'INDET_CULTIVAR', 'INDET_SPECIES', 'INDET_INFRASPECIES', 'HIGHER_RANK_BINOMIAL', 'QUESTION_MARKS_REMOVED', 'REPL_ENCLOSING_QUOTE', 'MISSING_GENUS', 'HTML_ENTITIES', 'XML_ENTITIES', 'NOMENCLATURAL_STATUS_INVALID', 'NOMENCLATURAL_CODE_INVALID', 'BASIONYM_AUTHOR_MISMATCH', 'BASIONYM_NOT_UNIQUE', 'BASIONYM_DERIVED', 'CONFLICTING_BASIONYM_COMBINATION', 'POTENTIAL_ORTHOGRAPHIC_VARIANT', 'HOMONYM', 'PUBLISHED_BEFORE_GENUS', 'REFERENCE_ID_INVALID', 'ID_NOT_UNIQUE', 'PARENT_ID_INVALID', 'ACCEPTED_ID_INVALID', 'BASIONYM_ID_INVALID', 'ACCEPTED_NAME_MISSING', 'RANK_INVALID', 'TAXONOMIC_STATUS_INVALID', 'LIFEZONE_INVALID', 'IS_FOSSIL_INVALID', 'IS_RECENT_INVALID', 'URL_INVALID', 'ACCORDING_TO_DATE_INVALID', 'CHAINED_SYNOYM', 'TAXONOMIC_STATUS_MISMATCH', 'PARENT_CYCLE', 'CLASSIFICATION_RANK_ORDER_INVALID', 'CLASSIFICATION_NOT_APPLIED', 'VERNACULAR_NAME_INVALID', 'VERNACULAR_NAME_TRANSLITERATED', 'DESCRIPTION_INVALID', 'DISTRIBUTION_INVALID', 'DISTRIBUTION_AREA_INVALID', 'DISTRIBUTION_COUNTRY_INVALID', 'DISTRIBUTION_STATUS_INVALID', 'DISTRIBUTION_GAZETEER_INVALID', 'SPECIES_PROFILE_INVALID', 'MULTIMEDIA_INVALID', 'BIB_REFERENCE_INVALID', 'ALT_IDENTIFIER_INVALID', 'BACKBONE_MATCH_NONE', 'BACKBONE_MATCH_FUZZY', 'NAME_NOT_UNIQUE', 'PARENT_NAME_NOT_UNIQUE', 'RELATIONSHIP_MISSING', 'NO_SPECIES', 'NAME_PARENT_MISMATCH', 'ORTHOGRAPHIC_VARIANT'];

module.exports = {
  template: require('./nameSearch.html'),
  controller: nameSearch
};

/** @ngInject */
function nameSearch($log, $stateParams, $state, NameSearch, DatasetKey) {
  var vm = this;
  vm.api = '//api.col.plus';
  vm.state = $stateParams;
  vm.rank = rank;
  vm.nomstatus = nomstatus;
  vm.taxstatus = taxstatus;
  vm.type = type;
  vm.issue = issue;
  vm.optionFilters = ['rank', 'nomstatus', 'taxstatus', 'type', 'issue'];

  vm.limit = _.toSafeInteger($stateParams.limit) || 20;
  vm.offset = _.toSafeInteger($stateParams.offset) || 0;

  var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
  vm.searchResults = NameSearch.query(q);

  vm.search = function (keepOffset) {
    if (!keepOffset) {
      vm.offset = undefined;
    }
    var q = _.assign({}, $stateParams, {limit: vm.limit, offset: vm.offset});
    $state.go('nameSearch', q);
  };

  function customDecoration(item, callback) {
    // get dataset title if not already there
    DatasetKey.get({key: item.datasetKey}).$promise
      .then(function (response) {
        item._datasetTitle = response.title;
        callback();
      })
      .catch(function () {
          // ignore errors
        callback();
      });
  }

  vm.tableConfig = {
    resource: NameSearch,
    columns: [
      {
        path: 'scientificName',
        title: 'Scientific Name'
      },
      {
        path: 'key',
        title: 'Name key',
        linkTemplate: '/name/{key}',
        templateKey: 'key'
      },
      {
        path: '_datasetTitle',
        title: 'Dataset',
        linkTemplate: '/dataset/{key}',
        templateKey: 'datasetKey'
      },
      {
        path: 'taxa',
        title: 'Taxa',
        type: 'ARRAY',
        displayPath: 'key',
        linkTemplate: '/taxon/{key}',
        templateKey: 'key'
      }
    ],
    decorator: customDecoration,
    paging: true
  };
}

/*
var list = 'ok, unavailable, illegitimate, variant, conserved, rejected, doubtful, unevaluated';
var a = list.toUpperCase();
var b = a.split(',');
b = b.map(function (e) {
  return e.trim();
});
*/
