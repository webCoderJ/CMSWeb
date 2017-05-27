import angular from 'angular';
export default function bindHtml($sce) {
    return function (text) {
        var newText = text.replace(/\n/g,'<br>');
        return $sce.trustAsHtml(newText);
    }
}
bindHtml.$inject = ['$sce'];