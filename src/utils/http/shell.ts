import {TauriCommandKey, tauriInvoke} from '.'

export const runShell = async () => {
	return tauriInvoke(TauriCommandKey.RUN_SHELL)
}
