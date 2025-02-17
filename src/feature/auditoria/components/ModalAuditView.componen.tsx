import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React from 'react';

interface IModalAuditViewComponentProps {
    newValueAudit: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalAuditViewComponent: React.FC<IModalAuditViewComponentProps> = ({
    newValueAudit,
    isOpen,
    onClose
}) => {
    const formatJSON = (jsonString: string) => {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            return jsonString;
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Detalle de Auditoría</DialogTitle>
            <DialogContent>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {formatJSON(newValueAudit)}
                </pre>
            </DialogContent>
        </Dialog>
    );
};
