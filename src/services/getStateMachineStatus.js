function getStateMachineStatus() {
    return {
        IDLE: 'idle',
        PENDING: 'pending',
        REJECT: 'reject',
        RESOLVE: 'resolve'
    }
}

export default getStateMachineStatus;