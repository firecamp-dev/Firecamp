import EventEmitter from 'eventemitter3';
import { TId } from "@firecamp/types";

export enum ERunnerEvents {
    Start = 'start',
    BeforeRequest = 'beforeRequest',
    Request = 'request',
    Done = 'done'
}

export default class Runner {

    private collection: any;
    private options: any;
    private requestOrdersForExecution: Set<TId>;
    private executedRequestQueue: Set<TId>;
    private currentRequestInExecution: TId;
    private testResults: any = [];
    private emitter: EventEmitter;
    constructor(collection, options) {
        this.collection = collection;
        this.options = options;
        this.requestOrdersForExecution = new Set();
        this.executedRequestQueue = new Set();
        this.currentRequestInExecution = '';
        this.emitter = new EventEmitter();
    }

    /**
     * validate that the collection format is valid
     * TODO: late we need to add the zod or json schema here for strong validation
     * 
     * @param collection "collection json payload"
     * @returns boolean
     */
    private validate() {
        const { collection: _c, folders: _fs, requests: _rs, requestItems: _ris, __meta } = this.collection
        if (!__meta?.version) throw new Error('The collection format is invalid')
        if (_fs && !Array.isArray(_fs)) throw new Error('The collection\'s folders format is invalid')
        if (_rs && !Array.isArray(_rs)) throw new Error('The collection\'s requests format is invalid')
        if (_ris && !Array.isArray(_ris)) throw new Error('The collection\'s request items format is invalid')
        return true;
    }

    /**
     * prepare an Set of request execution order
     */
    private prepareRequestExecutionOrder() {
        const { collection, folders } = this.collection
        const { __meta: { fOrders: rootFolderIds = [], rOrders: rootRequestIds = [] } } = collection

        const extractRequestIdsFromFolder = (fId: TId, requestIds: TId[] = []) => {
            const folder = folders.find(f => f.__ref.id == fId);
            if (!folder) return requestIds;
            if (folder.__meta.fOrders?.length) {
                const rIds = folder.__meta.fOrders.map(fId => extractRequestIdsFromFolder(fId, requestIds))
                requestIds = [...requestIds, ...rIds]
            }
            if (folder.__meta.rOrders?.length) {
                requestIds = [...requestIds, ...folder.__meta.rOrders]
            }
            return requestIds;
        }

        if (Array.isArray(rootFolderIds)) {
            rootFolderIds.map(fId => {
                const requestIds = extractRequestIdsFromFolder(fId)
                // console.log(requestIds, fId)
                requestIds.forEach(this.requestOrdersForExecution.add, this.requestOrdersForExecution);
            });
        }
        if (Array.isArray(rootRequestIds)) {
            rootRequestIds.forEach(this.requestOrdersForExecution.add, this.requestOrdersForExecution);
        }
    }

    private async executeRequest(requestId: TId) {
        const { requests } = this.collection;
        const request = requests.find(r => r.__ref.id == requestId);
        const response = await this.options.executeRequest(request);
        return { request, response };
    }

    private async startExecution() {

        try {
            const { value: requestId, done } = this.requestOrdersForExecution.values().next();
            if (!done) {
                this.currentRequestInExecution = requestId;
                const res = await this.executeRequest(requestId);
                this.testResults.push(res);
                this.executedRequestQueue.add(requestId);
                this.requestOrdersForExecution.delete(requestId);
                await this.startExecution();
            }

        }
        catch (error) {
            console.error(`Error while running the collection:`, error);
            // await this.startExecution(); // Retry fetching info for the remaining IDs even if an error occurred
        }

    }

    private _emit(evt: ERunnerEvents, payload?: any) {
        const { collection } = this.collection;

        switch (evt) {
            case ERunnerEvents.Start:
                this.emitter.emit(evt, {
                    name: collection.name,
                    id: collection.__ref.id
                });
                break;
            case ERunnerEvents.BeforeRequest:
                this.emitter.emit(evt);
                break;
            case ERunnerEvents.Request:
                this.emitter.emit(evt);
                break;
            case ERunnerEvents.Done:
                this.emitter.emit(evt, 558899);
                break;
        }

    }

    private exposeOnlyOn() {
        return {
            on: (evt: string, fn: (...a) => void) => {
                this.emitter.on(evt, fn)
                return this.exposeOnlyOn()
            }
        }
    }

    run() {

        try { this.validate() } catch (e) { throw e }
        this.prepareRequestExecutionOrder();

        setTimeout(async () => {
            this._emit(ERunnerEvents.Start);
            await this.startExecution();
            this._emit(ERunnerEvents.Done);
        })
        // stop collection runner

        // return this.testResults;
        return this.exposeOnlyOn()
    }
}