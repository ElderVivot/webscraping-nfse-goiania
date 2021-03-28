import { Browser, Page } from 'puppeteer'

import ISettingsGoiania from '../../models/ISettingsGoiania'
import { treateTextField } from '../../utils/functions'
import TreatsMessageLog from './TreatsMessageLog'

const Loguin = async (page: Page, browser: Browser, settings: ISettingsGoiania): Promise<void> => {
    try {
        await page.waitFor('#wt17_wtMainContent_wtUserNameInput')
        await page.type('#wt17_wtMainContent_wtUserNameInput', settings.loguin)
        await page.type('#wt17_wtMainContent_wtPasswordInput', settings.password)
        await page.click('#wt17_wtMainContent_wt28')
        await page.waitFor(4000)

        let userInvalid = ''
        try {
            userInvalid = await page.evaluate(() => {
                const warning = document.querySelector('#wt13_WebPatterns_wt4_block_RichWidgets_wt9_block_wtSanitizedHtml2')?.textContent
                return treateTextField(warning)
            })
        } catch (error) { }

        if (userInvalid.indexOf('SENHA INVALIDA') >= 0) {
            throw 'USER_OR_PASS_INVALID'
        }
        if (userInvalid.indexOf('MUITAS TENTATIVAS') >= 0 || userInvalid.indexOf('TOO MANY FAILED LOGIN') >= 0) {
            throw 'MANY_FAILED_LOGIN_ATTEMPTS'
        }
    } catch (error) {
        if (error === 'USER_OR_PASS_INVALID') {
            console.log('[Final-Loguin] - Usuário ou senha inválida')
            settings.messageLogToShowUser = 'Usuário ou senha inválida'
        } else if (error === 'MANY_FAILED_LOGIN_ATTEMPTS') {
            console.log('[Final-Loguin] - Muitas tentativas inválidas de loguin')
            settings.messageLogToShowUser = 'Muitas tentativas inválidas de loguin'
        } else {
            console.log('[Final-Loguin] - Erro ao fazer Loguin')
            settings.messageLogToShowUser = 'Erro ao tentar fazer loguin'
        }
        settings.typeLog = 'error'
        settings.messageLog = 'Loguin'
        settings.messageError = error

        const treatsMessageLog = new TreatsMessageLog(page, settings, browser)
        await treatsMessageLog.saveLog()
    }
}

export default Loguin