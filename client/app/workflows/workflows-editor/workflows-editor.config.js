'use strict';

/* @ngInject */
function WorkflowsConfig($stateProvider) {
  $stateProvider.state('workflows.editor', {
    url: '/:id/editor',
    views: {
      'navBar': {
        template: '<workflow-editor-status-bar ng-show="stateData.dataIsLoaded"></workflow-editor-status-bar>'
      },
      'reportView': {
        templateUrl: 'app/workflows/workflows-editor/workflows-editor.html',
        controller: 'WorkflowsEditorController as workflow'
      }
    },
    resolve: {
      workflowWithResults: /* @ngInject */ ($q, $state, $rootScope, $stateParams,
        $timeout, WorkflowsApiClient, Operations, OperationsHierarchyService,
        ErrorService, ServerCommunication
      ) => {
        let workflowWithResultsDeferred = $q.defer();

        ServerCommunication.init($stateParams.id);

        $rootScope.$on('ServerCommunication.MESSAGE.workflowWithResults', (event, data) => {
          workflowWithResultsDeferred.resolve(data);
        });

        $timeout(() => {
          $state.go(ErrorService.getErrorState('408'), {
            type: 'workflow'
          });
          workflowWithResultsDeferred.reject();
          ServerCommunication.stopReconnecting = true;
        }, 5000, false);

        return $q.all([
          workflowWithResultsDeferred.promise,
          Operations.load().then(OperationsHierarchyService.load)
        ]);
      }
    }
  });
}

exports.function = WorkflowsConfig;

exports.inject = function(module) {
  module.config(WorkflowsConfig);
};
