/*
This file has no dependencies

Simple user messages at the bottom of the visible window
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

    var overlay = new Notifier.Overlay();
    overlay.alert('Some message for the users');
    overlay.alert('Some error message', Notifier.MessageType.error);

Example CSS:

    #NotifierOverlayAlert
    {
        background-color: rgba(39, 48, 220, 1);
        color: #FFF;
        text-align: center;
    }

    #NotifierOverlayAlert.messageTypeError
    {
        background-color: rgba(220, 48, 39, 1);
    }

    #NotifierOverlayAlert.messageTypeSuccess
    {
        background-color: rgba(0, 0, 0, 1);
    }

*/

export class MessageType {
    static normal: string = 'messageTypeNormal';
    static success: string = 'messageTypeSuccess';
    static error: string = 'messageTypeError';
}

export class Overlay {

    private alertTimer;

    alert(message: string, messageType: string = MessageType.normal) {
        var notification = document.getElementById('NotifierOverlayAlert') || this.createMessageElement();

        var messageContainer = document.createElement('div');
        this.setOpacity(messageContainer, 0);
        messageContainer.innerHTML = message;
        messageContainer.className = messageType;
        this.setTransition(messageContainer, 'all 0.5s ease');
        
        notification.appendChild(messageContainer);

        this.setOpacity(messageContainer, 1);

        window.setTimeout(() => {
            this.setOpacity(messageContainer, 0);
            window.setTimeout(() => {
                notification.removeChild(messageContainer);
            }, 1000);
        }, 10 * 1000);
    }

    private setOpacity(element: HTMLElement, value: number) {
        element.style['webkitOpacity'] = value.toString();
        element.style['mozOpacity'] = value.toString();
        element.style['filter'] = 'alpha(opacity = ' + (value * 100) + ')';
        element.style.opacity = value.toString();
    }

    private setTransition(element: HTMLElement, value: string) {
        element.style.msTransition = 'all 0.5s';
        element.style['webkitTransition'] = 'all 0.5s';
        element.style['MozTransition'] = 'all 0.5s';
        element.style['OTransition'] = 'all 0.5s';
        element.style.transition = 'all 0.5s';
    }

    private createMessageElement() {
        var messageElement = document.createElement('div');
        messageElement.id = 'NotifierOverlayAlert';
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '10px';
        messageElement.style.width = '90%';
        messageElement.style.left = '4%';
        messageElement.style.padding = '1%';
        document.body.appendChild(messageElement);
        return messageElement;
    }
}
