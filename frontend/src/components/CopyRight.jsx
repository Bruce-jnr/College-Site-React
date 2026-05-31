export default function CopyRight() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="fixed-bottom bg-primary mt-5">
        <div className="container text-center py-3">
          <p className="mb-0 text-light small">
            © {currentYear} Nsawkaw CoE. All Rights Reserved
          </p>
        </div>
      </div>
    );
}