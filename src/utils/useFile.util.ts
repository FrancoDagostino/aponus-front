interface IFileUtil {
    downloadJsonFile: (exportObj: Object, exportName: string) => void;
    uploadJsonFile: <GData>() => Promise<GData>;
}

export const useFileUtil = (): IFileUtil => {

    const downloadJsonFile: IFileUtil["downloadJsonFile"] = (exportObj: Object, exportName: string) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const uploadJsonFile: IFileUtil["uploadJsonFile"] = async <GData>() => {

        return <GData>new Promise((resolve, reject) => {
            const reader = new FileReader();
            const fileInputElement = document.createElement('input');
            fileInputElement.type = "file";
            fileInputElement.accept = ".json";
            const bodyElement = document.getElementById('root')
            if (bodyElement === null) return reject();
            bodyElement.append(fileInputElement)
            fileInputElement.click();
            fileInputElement.addEventListener('change', e => {
                const element = e.currentTarget as HTMLInputElement;
                let fileList: FileList | null = element.files;
                if (fileList === null) return reject()
                reader.onload = function (e) {
                    try {
                        if (e.target === null) return reject()
                        const content = e.target.result as string;
                        const jsonData = JSON.parse(content);
                        fileInputElement.remove();
                        resolve(jsonData);
                    } catch (error) {
                        reject()
                    }
                };

                if (fileList[0] === undefined || fileList[0] === null) return reject();
                reader.readAsText(fileList[0]);
            })
        })
    }
    return {
        downloadJsonFile,
        uploadJsonFile,
    }
}