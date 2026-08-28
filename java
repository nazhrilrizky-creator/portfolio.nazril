import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Pendaftaran {
    private String nama;
    private String kelas;
    private String ekskul;
    private String alasan;

    public Pendaftaran(String nama, String kelas, String ekskul, String alasan) {
        this.nama = nama;
        this.kelas = kelas;
        this.ekskul = ekskul;
        this.alasan = alasan;
    }

    public void tampilkanInfo() {
        System.out.println("Nama    : " + nama);
        System.out.println("Kelas   : " + kelas);
        System.out.println("Ekskul  : " + ekskul);
        System.out.println("Alasan  : " + alasan);
        System.out.println("-----------------------------------");
    }
}

public class Main {
    public static void main(String[] args) {
        List<Pendaftaran> listPendaftar = new ArrayList<>();
        Scanner input = new Scanner(System.in);
        boolean running = true;

        System.out.println("=== SYSTEM PENGELOLAAN EKSKULHUB (JAVA) ===");

        while (running) {
            System.out.println("\n1. Tambah Pendaftar");
            System.out.println("2. Lihat Semua Pendaftar");
            System.out.println("3. Keluar");
            System.out.print("Pilih menu (1-3): ");
            
            int pilihan = input.nextInt();
            input.nextLine(); // clear buffer

            switch (pilihan) {
                case 1:
                    System.out.print("Masukkan Nama Lengkap: ");
                    String nama = input.nextLine();
                    System.out.print("Masukkan Kelas (10/11/12): ");
                    String kelas = input.nextLine();
                    System.out.print("Masukkan Ekskul Tujuan: ");
                    String ekskul = input.nextLine();
                    System.out.print("Masukkan Alasan: ");
                    String alasan = input.nextLine();

                    listPendaftar.add(new Pendaftaran(nama, kelas, ekskul, alasan));
                    System.out.println("✅ Data berhasil ditambahkan!");
                    break;
                case 2:
                    System.out.println("\n=== DAFTAR SISWA TERDAFTAR ===");
                    if (listPendaftar.isEmpty()) {
                        System.out.println("Belum ada data pendaftar.");
                    } else {
                        for (Pendaftaran p : listPendaftar) {
                            p.tampilkanInfo();
                        }
                    }
                    break;
                case 3:
                    running = false;
                    System.out.println("Terima kasih!");
                    break;
                default:
                    System.out.println("Pilihan tidak valid.");
            }
        }
        input.close();
    }
}