interface ConfirmDialogProps {
  title: string;
  cancelLabel: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  title,
  cancelLabel,
  confirmLabel,
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div className="dialog-backdrop" role="presentation" onPointerDown={onCancel}>
      <section
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-title">{title}</h2>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={onCancel} autoFocus>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={destructive ? 'danger-button' : 'primary-button'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
